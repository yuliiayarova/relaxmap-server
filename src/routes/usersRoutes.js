import { Router } from 'express';
import { getUserById, getCurrentUser } from '../controllers/users/user.js';
import { authMiddleWare } from '../middleware/authMiddleware.js';

const usersRouter = Router();

usersRouter.get('/profile', authMiddleWare, getCurrentUser);
usersRouter.get('/:id', getUserById);

export default usersRouter;
