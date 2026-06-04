import {
  loginUserController,
  logoutUserController,
  refreshUserController,
  registerUserController,
} from './auth/authControllers.js';

export const auth = {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserController,
};
