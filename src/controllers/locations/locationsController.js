import createHttpError from 'http-errors';
import { Location } from '../../models/location.js';

export const getAllLocations = async (req, res) => {
  const { page = 1, perPage = 10, region, locationType, search } = req.query;
  //   const { _id: userId } = req.user;
  const skip = (page - 1) * perPage;
  const locationsQuery = Location.find();
  //   if (userId) locationsQuery.where('userId').equals(userId);
  if (region) locationsQuery.where('region').equals(region);
  if (locationType) locationsQuery.where('locationType').equals(locationType);
  if (search) {
    locationsQuery.where({
      $or: [
        { type: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
      ],
    });
  }
  const [totalLocations, locations] = await Promise.all([
    locationsQuery.clone().countDocuments(),
    locationsQuery.clone().skip(skip).limit(perPage),
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
