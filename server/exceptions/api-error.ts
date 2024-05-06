class ApiError extends Error {
  status: number;
  errors: any[];

  constructor(status: number, message: string, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message: string, errors = []) {
    return new ApiError(400, message, errors);
  }

  static UnathorizedError() {
    return new ApiError(401, "User is not authorized");
  }
}

export default ApiError;
