import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import wrapAsync from '../../utils/wrapAsync';
import { authUserServices } from './user.service';

const authUserRegister = wrapAsync(async (req, res) => {
  const user = await authUserServices.authUserRegisterIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: user,
  });
});

const getAllUsers = wrapAsync(async (req, res) => {
  const result = await authUserServices.getAllUsersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users are Retrived Successfully',
    data: result,
  });
});

export const UserControllers = {
  authUserRegister,
  // createManager,
  getAllUsers,
};
