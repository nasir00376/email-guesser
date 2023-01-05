import { ErrorResult } from "./errors";

export class ValidationError extends ErrorResult {
  statusCode = 422;

  constructor(public reason: string) {
    super(reason);

    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serializeError() {
    return [{ message: this.reason }];
  }
}
