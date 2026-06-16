import { Router } from 'express';
import {
  getUserById,
  getCurrentUser,
  getUserLocations,
  updateUserController,
  deleteAvatarController,
} from '../controllers/users/user.js';
import { authMiddleWare } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/multer.js';

const usersRouter = Router();

usersRouter.get('/profile', authMiddleWare, getCurrentUser);
usersRouter.get('/:id', getUserById);
usersRouter.get('/:id/locations', getUserLocations);
usersRouter.patch(
  '/update-profile',
  authMiddleWare,
  upload.single('avatar'),
  updateUserController,
);
usersRouter.delete('/delete-avatar', authMiddleWare, deleteAvatarController);

export default usersRouter;
