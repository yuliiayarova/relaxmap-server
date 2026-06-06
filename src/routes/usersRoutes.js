import { Router } from 'express';
import { getUserById, getCurrentUser, getUserLocations } from '../controllers/users/user.js';
import { authMiddleWare } from '../middleware/authMiddleware.js';



const usersRouter = Router();

usersRouter.get('/profile', authMiddleWare, getCurrentUser);
usersRouter.get('/:id', getUserById);
usersRouter.get('/:id/locations', getUserLocations);

export default usersRouter;
