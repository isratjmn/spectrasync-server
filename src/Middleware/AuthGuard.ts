/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { TUserRole, User } from '../app/modules/User/user.model';
import appError from '../app/ErrorHandler/AppError';
import JWTError from '../app/ErrorHandler/JWTError';
import config from '../app/config';
import { verifyToken } from '../app/modules/Auth/auth.utils';

export const authGuard =
  (...requiredRoles: TUserRole[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract token from request headers
      const token = req.headers.authorization;

      // If token is not provided, throw Unauthorized error
      if (!token) {
        throw new appError(
          httpStatus.UNAUTHORIZED,
          'Unauthorized Access!! Token Not Provided',
        );
      }
      // Verify the JWT token
      const decoded = verifyToken(token, config.jwt_access_secret as string);
      // If decoded token is null or undefined, throw Unauthorized error
      if (!decoded) {
        throw new appError(
          httpStatus.UNAUTHORIZED,
          'Unauthorized Access!! Invalid Token',
        );
      }

      // Extract user ID and roel from token payload
      const { _id, role } = decoded;

      // Find user in the database by ID
      const user = await User.findById(_id);
      // If user not found, throw Not Found error
      if (!user) {
        throw new appError(httpStatus.NOT_FOUND, 'User Not Found!!!');
      }

      // Check if user has the required role
      if (requiredRoles.length && !requiredRoles.includes(role as TUserRole)) {
        throw new appError(
          httpStatus.FORBIDDEN,
          'You do not have Permission to Access this Resource!!',
        );
      }

      // Add user information to the request object
      req.user = user;
      console.log(user)

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
