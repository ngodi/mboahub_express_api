import { StatusCodes } from 'http-status-codes';
import { BaseError } from './baseError';

abstract class CustomError extends BaseError {
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  success = false;
  error = 'SERVER_ERROR';
  meta = {};

  constructor(message: string, error: string, meta?: {}) {
    super(message);
    this.error = error;
    this.meta = meta || {}; // Normalize undefined to empty object
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  serializeErrors() {
    const errorResponse: any = {
      message: this.message,
      statusCode: this.statusCode,
      success: this.success,
      error: this.error,
    };

    if (Object.keys(this.meta).length > 0) {
      errorResponse.meta = this.meta;
    }

    return errorResponse;
  }
}

class BadRequestError extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;

  constructor(message: string = 'Bad request', error: string = 'BAD_REQUEST') {
    super(message, error);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

class NotAuthorizedError extends CustomError {
  statusCode = StatusCodes.UNAUTHORIZED;

  constructor(
    message: string = 'Not authenticated',
    error: string = 'NOT_AUTHORIZED',
    meta?: {}
  ) {
    super(message, error, meta);
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
}

class TokenExpiredError extends CustomError {
  statusCode = StatusCodes.UNAUTHORIZED;

  constructor(
    message: string = 'Token has expired',
    error: string = 'TOKEN_EXPIRED'
  ) {
    super(message, error);
    Object.setPrototypeOf(this, TokenExpiredError.prototype);
  }
}
class ForbiddenError extends CustomError {
  statusCode = StatusCodes.FORBIDDEN;

  constructor(message: string = 'Not authorized', error: string = 'FORBIDDEN') {
    super(message, error);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

class UniqueConstraintError extends CustomError {
  statusCode = StatusCodes.CONFLICT;

  constructor(
    message: string = 'Duplicate record',
    error: string = 'DUPLICATE_ERROR'
  ) {
    super(message, error);
    Object.setPrototypeOf(this, UniqueConstraintError.prototype);
  }
}

class TooManyRequestsError extends CustomError {
  statusCode = StatusCodes.TOO_MANY_REQUESTS;

  constructor(
    message: string = 'Too many requests',
    error: string = 'TOO_MANY_REQUEST'
  ) {
    super(message, error);
    Object.setPrototypeOf(this, TooManyRequestsError.prototype);
  }
}

class NotFoundError extends CustomError {
  statusCode = StatusCodes.NOT_FOUND;

  constructor(message: string = 'Not found', error: string = 'NOT_FOUND') {
    super(message, error);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

class ValidationError extends CustomError {
  statusCode = StatusCodes.UNPROCESSABLE_ENTITY;

  constructor(
    message: string = 'Validation Error',
    error: string = 'VALIDATION_ERROR'
  ) {
    super(message, error);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

class ServerError extends CustomError {
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  constructor(
    message: string = 'A server error occurred',
    error: string = 'SERVER_ERROR'
  ) {
    super(message, error);
    Object.setPrototypeOf(this, ServerError.prototype);
  }
}

export {
  ForbiddenError,
  UniqueConstraintError,
  TooManyRequestsError,
  NotAuthorizedError,
  TokenExpiredError,
  NotFoundError,
  CustomError,
  ValidationError,
  BadRequestError,
  ServerError,
};
