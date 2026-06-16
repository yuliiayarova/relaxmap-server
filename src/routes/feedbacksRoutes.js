import { Router } from 'express';
import {
  createFeedbackByLocationId,
  getAllFeedbacks,
  getFeedbacksByLocationId,
} from '../controllers/feedbacks/feedbacksController.js';
import { authMiddleWare } from '../middleware/authMiddleware.js';
import {
  createFeedbackByLocationIdSchema,
  getAllFeedbacksSchema,
  getFeedbacksByLocationIdSchema,
} from '../validations/feedbacksValidations.js';
import { celebrate } from 'celebrate';

const feedbacksRouter = Router();

// Public routes

feedbacksRouter.get(
  '/api/feedbacks',
  celebrate(getAllFeedbacksSchema),
  getAllFeedbacks,
);

feedbacksRouter.get(
  '/api/feedbacks/:locationId',
  celebrate(getFeedbacksByLocationIdSchema),
  getFeedbacksByLocationId,
);

// Private routes
feedbacksRouter.post(
  '/api/feedbacks/:locationId',
  authMiddleWare,
  celebrate(createFeedbackByLocationIdSchema),
  createFeedbackByLocationId,
);

export default feedbacksRouter;
