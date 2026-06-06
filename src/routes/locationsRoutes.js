import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getAllLocationsSchema,
  getLocationByIdSchema,
} from '../validations/locationValidations.js';
import {
  getAllLocations,
  getLocationById,
} from '../controllers/locations/locationsController.js';

const locationsRouter = Router();

locationsRouter.get(
  '/api/locations',
  celebrate(getAllLocationsSchema),
  getAllLocations,
);

locationsRouter.get(
  '/api/locations/:locationId',
  celebrate(getLocationByIdSchema),
  getLocationById,
);

export default locationsRouter;
