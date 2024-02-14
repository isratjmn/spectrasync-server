import { Manager } from './manager.model';

const createManagerIntoDB = async (managerData: {
  username: string;
  email: string;
  password: string;
}) => {
  const createdManager = await Manager.create(managerData);
  return createdManager;
};

const getAllManagerFromDB = async () => {
  const result = await Manager.find();
  return result;
};

export const ManagerServices = {
  createManagerIntoDB,
  getAllManagerFromDB,
};
