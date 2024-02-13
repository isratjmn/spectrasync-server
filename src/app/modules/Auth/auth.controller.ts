import { Request, Response } from 'express';
import { registerUser, loginUser } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

export const registerUserHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { username, email, password } = req.body;
  const newUser = await registerUser(username, email, password);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Registered successfully',
    data: {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    },
  });
};

export const loginUserHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { email, password } = req.body;
  const { token, user } = await loginUser(email, password);
  console.log(user)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Login Successfully',
    data: {
      username: user.username,
      email: user.email,
      role: user.role,
      token,
    },
  });
};
