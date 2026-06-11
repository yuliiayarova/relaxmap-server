import { User } from '../models/user.js';
import { Location } from '../models/location.js';

export const getUserByIdService = async (userId) => {
  const user = await User.findById(userId);
  return user;
};

export const getUserLocationsService = async (userId, page, limit) => {
  const skip = (page - 1) * limit;
  const [locations, totalItems] = await Promise.all([
    Location.find({ ownerId: userId }).skip(skip).limit(limit),
    Location.countDocuments({ ownerId: userId }),
  ]);
  return { locations, totalItems };
};

export const updateUserService = async (userId, updateData) => {
  return await User.findByIdAndUpdate(userId, updateData, { new: true }).select(
    '-password',
  );
};
