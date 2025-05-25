export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(400, message);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = "Authentication failed") {
    super(401, message);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = "Not authorized to perform this action") {
    super(403, message);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found") {
    super(404, message);
  }
}

export const handleError = (error: Error) => {
  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      message: error.message
    };
  }

  // Handle unknown errors
  return {
    statusCode: 500,
    message: "Internal server error"
  };
}; 