import { Router } from 'express';
import { getAllFeedbacks } from '../controllers/feedbacks/feedbacksController';

const feedbacksRouter = Router();

feedbacksRouter.get('/api/feedbacks', getAllFeedbacks);

export default feedbacksRouter;
