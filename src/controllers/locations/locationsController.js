import createHttpError from 'http-errors';
import { Location } from '../../models/location.js';

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
  const [totalLocations, locations] = await Promise.all([
    locationsQuery.clone().countDocuments(),
    locationsQuery
      .clone()
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder }),
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
  res.status(201).json(location);
};

export const updateLocation = async (req, res) => {
  const { locationId } = req.params;
  const location = await Location.findOneAndUpdate(
    {
      _id: locationId,
      ownerId: req.user._id,
    },
    req.body,
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
