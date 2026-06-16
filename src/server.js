import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import { logger } from './middleware/logger.js';
import { connectMongoDB } from './db/connectToMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRouter from './routes/authRoutes.js';
import usersRouter from './routes/usersRoutes.js';
import categoriesRouter from './routes/categoriesRoutes.js';
import feedbacksRouter from './routes/feedbacksRoutes.js';
import locationsRouter from './routes/locationsRoutes.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.js';

const allowedOrigins = [
  'http://localhost:3000',
  'https://localhost:3000',
  'http://localhost:3001',
  'https://editor.swagger.io',
  'https://relaxmap-server-a8mo.onrender.com',
  process.env.FRONTEND_DOMAIN,
].filter(Boolean);

const app = express();
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(logger);
const PORT = process.env.PORT ?? 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/swagger.json', (req, res) => res.json(swaggerSpec));

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/categories', categoriesRouter);
app.use(locationsRouter);
app.use(feedbacksRouter);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

