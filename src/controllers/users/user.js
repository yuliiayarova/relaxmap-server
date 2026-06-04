import { getUserByIdService, getUserLocationsService } from '../../services/user.js';

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

export const getUserLocations = async (req, res, next) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const user = await getUserByIdService(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { locations, totalItems } = await getUserLocationsService(id, page, limit);
    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({
      status: 200,
      message: 'Successfully found user locations!',
      data: {
        locations,
        page,
        limit,
        totalItems,
        totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};
