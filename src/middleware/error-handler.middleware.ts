import { Request, Response, NextFunction } from 'express';
import HttpError from '@app/error-handler/http-error';

// General error handler
export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(`${error.name}: ${error.message}`);

  if (error instanceof HttpError) {
    res.status(error.statusCode).json({ error: error.message });
  } else {
    res.status(500).json({ error: 'Unexpected error occurred' });
  }
};
