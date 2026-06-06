import { Router } from 'express';
import {
  createFeedbackByLocationId,
  getAllFeedbacks,
  getFeedbacksByLocationId,
} from '../controllers/feedbacks/feedbacksController.js';
import { authMiddleWare } from '../middleware/authMiddleware.js';

const feedbacksRouter = Router();

// Public routes

feedbacksRouter.get('/api/feedbacks', getAllFeedbacks);

feedbacksRouter.get('/api/feedbacks/:locationId', getFeedbacksByLocationId);


// Private routes
feedbacksRouter.post(
  '/api/feedbacks/:locationId',
  authMiddleWare,
  createFeedbackByLocationId,
);

export default feedbacksRouter;
