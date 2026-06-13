import createHttpError from 'http-errors';
import { Location } from '../../models/location.js';
import { saveFileToCloudinary } from '../../utils/saveFileToCloudinary.js';

export const getAllLocations = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    region,
    locationType,
    search,
    sortBy = '_id',
    sortOrder = 'asc',
  } = req.query;

  const skip = (page - 1) * perPage;

  const match = {};
  if (region) match.region = region;
  if (locationType) match.locationType = locationType;
  if (search) {
    match.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  let sortStage = {};
  switch (sortBy) {
    case 'rate':
      sortStage = { rate: -1 };
      break;
    case 'popular':
      sortStage = { feedbacksCount: -1 };
      break;
    case 'newest':
      sortStage = { createdAt: -1 };
      break;
    default:
      sortStage = { _id: 1 };
      break;
  }

  const pipeline = [
    { $match: match },
    {
      $addFields: {
        feedbacksCount: { $size: { $ifNull: ['$feedbacksId', []] } },
      },
    },
    /* начало вставки */
    {
      $lookup: {
        from: 'locationtypes',
        localField: 'locationType',
        foreignField: 'slug',
        as: 'locationTypeData',
      },
    },
    {
      $unwind: { path: '$locationTypeData', preserveNullAndEmptyArrays: true },
    } /*конец вставки */,
    { $sort: sortStage },
    { $skip: skip },
    { $limit: parseInt(perPage) },
  ];
  /* начало вставки */
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
  /* конец вставки */

  const [locations, totalLocations] = await Promise.all([
    Location.aggregate(pipeline),
    Location.countDocuments(match),
  ]);

  const totalPages = Math.ceil(totalLocations / perPage);

  res
    .status(200)
    .json({ page, perPage, totalLocations, totalPages, locations });

  /*
  const {
    page = 1,
    perPage = 10,
    region,
    locationType,
    search,
    sortBy = '_id',
    sortOrder = 'asc',
  } = req.query;
  //   const { _id: userId } = req.user;
  const skip = (page - 1) * perPage;
  const locationsQuery = Location.find();
  //   if (userId) locationsQuery.where('userId').equals(userId);
  if (region) locationsQuery.where('region').equals(region);
  if (locationType) locationsQuery.where('locationType').equals(locationType);
  if (search) {
    locationsQuery.where({
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ],
    });
  }

  let tmp_sortBy = sortBy;
  let tmp_sortOrder = sortOrder;

  switch (sortBy) {
    case 'rate':
      tmp_sortOrder = 'desc';
      break;
    case 'popular':
      tmp_sortBy = 'location.feedbacksId.length';
      tmp_sortOrder = 'desc';
      break;
    case 'newest':
      // tmp_sortBy = 'updatedAt';
      tmp_sortOrder = 'desc';
      break;

    default:
      tmp_sortBy = sortBy;
      tmp_sortOrder = sortOrder;
      console.log('не нашли по чем сортировать, применяем _id');
      break;
  }

  const [totalLocations, locations] = await Promise.all([
    locationsQuery.clone().countDocuments(),
    locationsQuery
      .clone()
      .skip(skip)
      .limit(perPage)
      .sort({ [tmp_sortBy]: tmp_sortOrder }),
  ]);
  const totalPages = Math.ceil(totalLocations / perPage);
  res
    .status(200)
    .json({ page, perPage, totalLocations, totalPages, locations });
/**/
};

export const getLocationById = async (req, res) => {
  const { locationId } = req.params;
  const location = await Location.findOne({
    _id: locationId,
  });

  if (!location) {
    throw createHttpError(404, 'Location not found');
  }
  res.status(200).json(location);
};

export const createLocation = async (req, res) => {
  const location = await Location.create({
    ...req.body,
    ownerId: req.user._id,
  });

  if (req.file) {
    const uploadedImage = await saveFileToCloudinary(
      req.file.buffer,
      location._id,
    );

    const image = uploadedImage.secure_url;

    location.image = image;
    await location.save();
  }
  res.status(201).json(location);
};

export const updateLocation = async (req, res) => {
  const { locationId } = req.params;

  let updateData = { ...req.body };

  if (req.file) {
    const uploadedImage = await saveFileToCloudinary(
      req.file.buffer,
      locationId,
    );

    updateData.image = uploadedImage.secure_url;
  }
  const location = await Location.findOneAndUpdate(
    {
      _id: locationId,
      ownerId: req.user._id,
    },
    updateData,
    {
      returnDocument: 'after',
      runValidators: true,
    },
  );
  if (!location) {
    throw createHttpError(404, 'Location not found');
  }
  res.status(200).json(location);
};
