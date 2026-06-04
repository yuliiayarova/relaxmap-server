import { Router } from 'express';
import usersRouter from './usersRoutes.js';

const router = Router();
router.use('/users', usersRouter);

export default router;
