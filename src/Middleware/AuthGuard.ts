/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { TRole, User } from '../app/modules/User/user.model';
import wrapAsync from '../app/utils/wrapAsync';
import appError from '../app/ErrorHandler/AppError';
import JWTError from '../app/ErrorHandler/JWTError';
import config from '../app/config';
import { verifyToken } from '../app/modules/Auth/auth.utils';

export const authGuard =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract token from request headers
      const token = req.headers.authorization;

      // If token is not provided, throw Unauthorized error
      if (!token) {
        throw new appError(
          httpStatus.UNAUTHORIZED,
          'Unauthorized Access!! Token not provided',
        );
      }

      // Verify the JWT token
      const decoded = verifyToken(token, config.jwt_access_secret as string);

      // Extract user ID from token payload
      const userId = (decoded as { userId: string }).userId;

      // Find user in the database by ID
      const user = await User.findById(userId);

      // If user not found, throw Not Found error
      if (!user) {
        throw new appError(httpStatus.NOT_FOUND, 'User Not found!!!');
      }

      // Check if user has the required role
      if (roles.length && !roles.includes(user.role)) {
        throw new appError(
          httpStatus.FORBIDDEN,
          'You do not have permission to access this resource',
        );
      }

      // Add user information to the request object
      req.user = user;

      // Call the next middleware function
      next();
    } catch (err: any) {
      // Handle errors
      console.error(err);
      if (err.name === 'JsonWebTokenError') {
        return res
          .status(httpStatus.UNAUTHORIZED)
          .json({ message: 'Invalid token' });
      }
      if (err.name === 'TokenExpiredError') {
        return res
          .status(httpStatus.UNAUTHORIZED)
          .json({ message: 'Token expired' });
      }
      res.status(err.statusCode || 500).json({ message: err.message });
    }
  };

export default authGuard;
