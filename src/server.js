import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import { connectMongoDB } from './db/connectToMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRouter from './routes/authRoutes.js';
import usersRouter from './routes/usersRoutes.js';
import categoriesRouter from './routes/categoriesRoutes.js';
import locationsRouter from './routes/locationsRoutes.js';
import feedbacksRouter from './routes/feedbacksRoutes.js';

const app = express();
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/locations', locationsRouter);
app.use('/api/feedbacks', feedbacksRouter);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
