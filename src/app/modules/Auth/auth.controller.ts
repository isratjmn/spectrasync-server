import { Request, Response } from 'express';
import { registerUser, loginUser } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import wrapAsync from '../../utils/wrapAsync';
import config from '../../config';

export const registerUserHandler = async (req: Request, res: Response) => {
  const newUser = await registerUser(req.body);
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

export const loginUserHandler = wrapAsync(
  async (req: Request, res: Response) => {
    const result = await loginUser(req.body);
    const { accessToken, user } = result;

    let successMessage = '';
    if (user.role === 'user') {
      successMessage = 'User is logged in successfully!';
    } else if (user.role === 'manager') {
      successMessage = 'Manager is logged in successfully!';
    }
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: successMessage,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        accessToken,
      },
    });
  },
);

/* export const loginUserHandler = async (
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
}; */
