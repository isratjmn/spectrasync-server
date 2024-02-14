import httpStatus from 'http-status';
import wrapAsync from '../../utils/wrapAsync';
import { ManagerServices } from './manager.service';
import sendResponse from '../../utils/sendResponse';

const createManager = wrapAsync(async (req, res) => {
  const managerData = req.body;
  const savedManager = await ManagerServices.createManagerIntoDB(managerData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Manager is Created Succesfully',
    data: savedManager,
  });
});

const getAllManagers = wrapAsync(async (req, res) => {
  const result = await ManagerServices.getAllManagerFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Manager are Retrieved Succesfully!!!',
    data: result,
  });
});

export const ManagerControllers = {
  getAllManagers,
  createManager,
};
