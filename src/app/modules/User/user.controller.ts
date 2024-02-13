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

export const authUserControllers = {
  authUserRegister,
};
