import { getUserByIdService } from '../../services/user.js';

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
