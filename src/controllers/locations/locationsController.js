import createHttpError from 'http-errors';
import { Location } from '../../models/location.js';
import { saveFileToCloudinary } from '../../utils/saveFileToCloudinary.js';
import { User } from '../../models/user.js';

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
    },
    { $sort: sortStage },
    { $skip: skip },
    { $limit: parseInt(perPage) },
  ];
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
  const [locations, totalLocations] = await Promise.all([
    Location.aggregate(pipeline),
    Location.countDocuments(match),
  ]);

  const totalPages = Math.ceil(totalLocations / perPage);

  res
    .status(200)
    .json({ page, perPage, totalLocations, totalPages, locations });
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

  await User.findByIdAndUpdate(req.user._id, {
    $inc: { articlesAmount: 1 },
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
