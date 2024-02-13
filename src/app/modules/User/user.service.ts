import { TUser, User } from './user.model';

const authUserRegisterIntoDB = async (payload: TUser) => {
  const user = await User.create(payload);
  return user;
};

export const authUserServices = {
  authUserRegisterIntoDB,
};
