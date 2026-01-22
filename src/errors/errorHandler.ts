import { Application, NextFunction, Request, Response } from 'express';
import { BaseError } from './baseError';
import { StatusCodes } from 'http-status-codes';

export const errorhandler = (app: Application): void => {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(StatusCodes.CONFLICT).json({
        message: err.message,
        statusCode: StatusCodes.CONFLICT,
        success: false,
        error: 'DUPLICATE_ERROR',
      });
    }
    // SequelizeForeignKeyConstraintError
    if (err.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid foreign key reference',
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
        error: 'BAD_REQUEST',
      });
    }

    // TokenExpiredError
    if (err.name === 'TokenExpiredError') {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'Token has expired',
        statusCode: StatusCodes.UNAUTHORIZED,
        success: false,
        error: 'TOKEN_EXPIRED',
      });
    }

    //SequelizeValidationError
    if (err.name === 'SequelizeValidationError') {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: err.message,
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
        error: 'VALIDATION_ERROR',
      });
    }

    if (err instanceof BaseError) {
      return res.status(err.statusCode).json(err.serializeErrors());
    }

    // any other Error
    if (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'server error occurred',
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        error: 'SERVER_ERROR',
      });
    }

    next();
  });
};
