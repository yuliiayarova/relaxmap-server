import { Router } from 'express';

import { auth } from '../controllers/index.js';
import { authMiddleWare } from '../middleware/authMiddleware.js';
import { celebrate } from 'celebrate';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidations.js';

const authRouter = Router();

// Public routes
authRouter.post(
  '/register',
  celebrate(registerUserSchema),
  auth.registerUserController,
);
authRouter.post('/login', celebrate(loginUserSchema), auth.loginUserController);
authRouter.post('/refresh', auth.refreshUserController);

// Private routes
authRouter.post('/logout', authMiddleWare, auth.logoutUserController);

export default authRouter;
