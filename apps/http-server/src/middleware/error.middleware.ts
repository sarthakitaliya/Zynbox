import { Request, Response } from 'express';
import { handleError } from '../utils/errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response
) => {
  const error = handleError(err);
  
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  res.status(error.statusCode).json({
    status: 'error',
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}; 