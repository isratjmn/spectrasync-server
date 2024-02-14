import { Manager } from '../Manager/manager.model';
import { TUser, User } from './user.model';

const authUserRegisterIntoDB = async (payload: TUser) => {
  const user = await User.create(payload);
  return user;
};

/* const createManagerIntoDB = async (managerData: {
  username: string;
  email: string;
  password?: string;
}) => {
  const newManager = new Manager(managerData);
  const savedManager = await newManager.save();
  return savedManager;
}; */

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

export const authUserServices = {
  authUserRegisterIntoDB,
  // createManagerIntoDB,
  getAllUsersFromDB,
};
