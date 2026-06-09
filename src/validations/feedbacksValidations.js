import { Joi, Segments } from 'celebrate';

export const getAllFeedbacksSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(6).default(6),
  }),
};

export const getFeedbacksByLocationIdSchema = {
  [Segments.PARAMS]: Joi.object({
    locationId: Joi.string().hex().length(24).required(),
  }),

  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(20).default(3),
  }),
};

export const createFeedbackByLocationIdSchema = {
  [Segments.PARAMS]: Joi.object({
    locationId: Joi.string().hex().length(24).required(),
  }),
  [Segments.BODY]: Joi.object({
    rate: Joi.number().min(1).max(5).required(),
    description: Joi.string().min(3).max(1000).required(),
  }),
};
