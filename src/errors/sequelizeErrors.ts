import { ValidationError, UniqueConstraintError } from 'sequelize';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from './custom-error';

export class SequelizeValidationAppError extends CustomError {
  statusCode = StatusCodes.UNPROCESSABLE_ENTITY;

  details: { field: string | null; message: string }[];

  constructor(error: ValidationError | UniqueConstraintError) {
    super(error.message, error.name);
    Object.setPrototypeOf(this, SequelizeValidationAppError.prototype);

    this.details = error.errors.map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  override serializeErrors() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      success: this.success,
      errors: this.details,
      error: this.error,
    };
  }
}
