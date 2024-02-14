/* eslint-disable @typescript-eslint/no-unused-vars */
class JWTError extends Error {
  public statusCode: number;
  public data: null;
  constructor(code: number, message: string, data: null) {
    super(message);
    this.statusCode = code;
    this.data = null;
  }
}

export default JWTError;
