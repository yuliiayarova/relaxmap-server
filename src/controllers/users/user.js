import {
  getUserByIdService,
  getUserLocationsService,
  updateUserService,
} from '../../services/user.js';
import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../../utils/saveFileToCloudinary.js';

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

export const updateUserController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { name } = req.body;

    const updateData = {};

    if (name) {
      updateData.name = name;
    }

    if (req.file) {
      try {
        const cloudinaryResult = await saveFileToCloudinary(
          req.file.buffer,
          userId,
          'relaxmap/avatars',
          'avatar',
        );
        updateData.avatarUrl = cloudinaryResult.secure_url;
      } catch (cloudinaryError) {
        return next(
          createHttpError(500, 'Помилка при завантаженні аватара в хмару'),
        );
      }
    }

    if (Object.keys(updateData).length === 0) {
      return next(createHttpError(400, 'Немає даних для оновлення'));
    }

    const updatedUser = await updateUserService(userId, updateData);

    if (!updatedUser) {
      return next(createHttpError(404, 'Користувача не знайдено'));
    }

    res.status(200).json({
      status: 'success',
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAvatarController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const defaultAvatarUrl =
      'https://ac.goit.global/fullstack/react/default-avatar.jpg';

    const updatedUser = await updateUserService(userId, {
      avatarUrl: defaultAvatarUrl,
    });

    if (!updatedUser) {
      return next(createHttpError(404, 'Користувача не знайдено'));
    }

    res.status(200).json({
      status: 'success',
      message: 'Аватар успішно видалено',
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
