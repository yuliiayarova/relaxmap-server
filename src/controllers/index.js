import {
  loginUserController,
  logoutUserController,
  refreshUserController,
  registerUserController,
} from './auth/authControllers.js';

import { getCategories } from './categories/getCategories.js';

export const auth = {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserController,
};

export const categories = {
  getCategories,
};
