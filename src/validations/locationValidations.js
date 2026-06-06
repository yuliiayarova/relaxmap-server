import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return isValidObjectId(value) ? value : helpers.message('Invalid id format');
};

// const locationsSortFields = ['rate'];

export const getAllLocationsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().min(1).default(1),
    perPage: Joi.number().min(5).max(20).default(10),
    region: Joi.string().allow(''),
    locationType: Joi.string().allow(''),
    search: Joi.string().allow(''),
    sortOrder: Joi.string().valid('asc', 'desc').default('asc'),
    sortBy: Joi.string().valid('_id', 'rate').default('_id'),
  }),
};

export const getLocationByIdSchema = {
  [Segments.PARAMS]: Joi.object({
    locationId: Joi.string().custom(objectIdValidator).required(),
  }),
};
