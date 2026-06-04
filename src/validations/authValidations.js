import { Joi, Segments } from 'celebrate';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().required().min(2).max(32).messages({
      'string.base': 'Name must be a string',
      'string.min': 'Name must be a 2 or more characters long',
      'string.max': 'Name must be a 32 or less characters long',
      'any.required': 'Name required',
    }),
    email: Joi.string().email().required().trim().max(64).messages({
      'string.base': 'Email must be a string',
      'string.email': 'Email must be valid',
      'string.max': 'Email must be a 64 or less characters long',
      'any.required': 'Email required',
    }),
    password: Joi.string().required().min(8).max(128).messages({
      'string.base': 'Password must be a string',
      'string.min': 'Password must be a 8 or more characters long',
      'string.max': 'Password must be a 128 or less characters long',
      'any.required': 'Password required',
    }),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().trim().max(64).messages({
      'string.base': 'Email must be a string',
      'string.email': 'Email must be valid',
      'string.max': 'Email must be a 64 or less characters long',
      'any.required': 'Email required',
    }),
    password: Joi.string().required().min(8).max(128).messages({
      'string.base': 'Password must be a string',
      'string.min': 'Password must be a 8 or more characters long',
      'string.max': 'Password must be a 128 or less characters long',
      'any.required': 'Password required',
    }),
  }),
};
