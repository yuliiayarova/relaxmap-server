import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getAllLocationsSchema,
  getLocationByIdSchema,
  createLocationSchema,
  updateLocationSchema,
} from '../validations/locationValidations.js';
import {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
} from '../controllers/locations/locationsController.js';
import { authMiddleWare } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/multer.js';

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
locationsRouter.post(
  '/api/locations',
  authMiddleWare,
  upload.single('image'),
  celebrate(createLocationSchema),
  createLocation,
);
locationsRouter.patch(
  '/api/locations/:locationId',
  authMiddleWare,
  upload.single('image'),
  celebrate(updateLocationSchema),
  updateLocation,
);
export default locationsRouter;
