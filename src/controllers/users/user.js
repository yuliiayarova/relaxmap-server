import {
  getUserByIdService,
  getUserLocationsService,
} from '../../services/user.js';
import createHttpError from 'http-errors';

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdService(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      status: 200,
      message: 'Successfully found user!',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      throw createHttpError(401, 'User is not authenticated');
    }

    const user = await getUserByIdService(userId);

    if (!user) {
      throw createHttpError(404, 'User not found');
    }
    res.status(200).json({
      status: 200,
      message: 'Successfully found user!',
      data: {
        name: user.name,
        avatarUrl: user.avatarUrl,
        articlesAmount: user.articlesAmount,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserLocations = async (req, res, next) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const user = await getUserByIdService(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { locations, totalItems } = await getUserLocationsService(
      id,
      page,
      limit,
    );
    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({
      status: 200,
      message: 'Successfully found user locations!',
      page,
      limit,
      totalItems,
      totalPages,
      locations,
    });
  } catch (error) {
    next(error);
  }
};
