export interface IError {
  statusCode: number;
  message: string;
  success: boolean;
  error: string;
}

export interface IErrorObject {
  errors: { field?: string; message: string }[];
  statusCode: number;
  success: boolean;
  error: string;
}

export abstract class BaseError extends Error {
  abstract statusCode: number;
  abstract success: boolean;
  abstract error: string;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BaseError.prototype);
  }

  abstract serializeErrors(): IErrorObject | IError;
}
