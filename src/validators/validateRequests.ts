import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ExpressValidationError } from '../errors/expressValidationError';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ExpressValidationError(errors.array());
  }
  next();
};
