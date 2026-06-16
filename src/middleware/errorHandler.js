import { HttpError } from "http-errors";

export const errorHandler = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;

  res.status(status).json({
    message:
      status === 500
        ? 'Something went wrong. Please try again later.'
        : err.message,
  });
};
