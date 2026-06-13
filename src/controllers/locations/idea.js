const pipeline = [
  { $match: match },
  {
    $lookup: {
      from: 'locationtypes', // имя коллекции LocationType
      localField: 'locationType', // slug в Location
      foreignField: 'slug', // slug в LocationType
      as: 'locationTypeData',
    },
  },
  { $unwind: { path: '$locationTypeData', preserveNullAndEmptyArrays: true } },
];

// если search есть — добавляем фильтр по type
if (search) {
  pipeline.push({
    $match: {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'locationTypeData.type': { $regex: search, $options: 'i' } },
      ],
    },
  });
}

// дальше твои стадии сортировки и пагинации
pipeline.push(
  {
    $addFields: {
      feedbacksCount: { $size: { $ifNull: ['$feedbacksId', []] } },
    },
  },
  { $sort: sortStage },
  { $skip: skip },
  { $limit: parseInt(perPage) },
);

const [locations, totalLocations] = await Promise.all([
  Location.aggregate(pipeline),
  Location.countDocuments(match),
]);
