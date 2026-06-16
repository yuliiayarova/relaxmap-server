import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return isValidObjectId(value) ? value : helpers.message('Invalid id format');
};

const locationsSortFields = ['_id', 'rate', 'popular', 'newest'];

export const getAllLocationsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().min(1).default(1),
    perPage: Joi.number().min(5).max(20).default(10),
    region: Joi.string().allow(''),
    locationType: Joi.string().allow(''),
    search: Joi.string().allow(''),
    sortOrder: Joi.string().valid('asc', 'desc').default('asc'),
    sortBy: Joi.string()
      .valid(...locationsSortFields)
      .default('_id'),
  }),
};

export const getLocationByIdSchema = {
  [Segments.PARAMS]: Joi.object({
    locationId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createLocationSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().required(),
    locationType: Joi.string().required(),
    region: Joi.string().required(),
    description: Joi.string().trim().required(),
    coordinates: Joi.object({
      lat: Joi.number().required(),
      lon: Joi.number().required(),
    }).required(),
  }),
};

export const updateLocationSchema = {
  [Segments.PARAMS]: Joi.object({
    locationId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim(),
    locationType: Joi.string(),
    region: Joi.string(),
    description: Joi.string().trim(),
    coordinates: Joi.object({
      lat: Joi.number().required(),
      lon: Joi.number().required(),
    }),
  }).min(1),
};
