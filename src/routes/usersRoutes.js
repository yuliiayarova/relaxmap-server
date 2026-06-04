import { Router } from 'express';
import { getUserById, getUserLocations } from '../controllers/users/user.js';

const usersRouter = Router();

usersRouter.get('/:id', getUserById);
usersRouter.get('/:id/locations', getUserLocations);

export default usersRouter;
