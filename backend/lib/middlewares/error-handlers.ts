import { Request, Response, NextFunction } from 'express';
import { ErrorResult } from '../errors';

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  if (error instanceof ErrorResult) {
    return res.status(error.statusCode).send({ errors: error.serializeError() });
  }

  return res.status(400).send({ errors: [{ message: error.message || 'Something went wrong.' }] })
}