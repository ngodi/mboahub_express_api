import { BaseError, IErrorObject } from './baseError';

export class ExpressValidationError extends BaseError {
  statusCode = 422;
  success = false;
  error = '';
  errors: any[];

  constructor(errors: any[], error: string = 'VALIDATION_ERROR') {
    super('Invalid request parameters');
    this.errors = errors;
    this.error = error;
    Object.setPrototypeOf(this, ExpressValidationError.prototype);
  }

  serializeErrors(): IErrorObject {
    return {
      statusCode: this.statusCode,
      success: this.success,
      error: this.error,
      errors: this.errors.map((err) => ({
        field: err.type === 'field' ? err.path : undefined,
        message: err.msg,
      })),
    };
  }
}
