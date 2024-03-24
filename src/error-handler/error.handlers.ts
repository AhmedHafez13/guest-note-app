import HttpError from "./http-error";

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(400, message);
    this.name = 'BadRequest';
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(401, message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string) {
    super(403, message);
    this.name = 'Forbidden';
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(404, message);
    this.name = 'NotFoundError';
  }
}

export class UnprocessableError extends HttpError {
  constructor(message: string) {
    super(422, message);
    this.name = 'Unprocessable';
  }
}
