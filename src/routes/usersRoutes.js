import { Router } from 'express';
import { getUserById } from '../controllers/users/user.js';

const usersRouter = Router();

usersRouter.get('/:id', getUserById);

export default usersRouter;
