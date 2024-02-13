import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TUser, User } from '../User/user.model';
import config from '../../config';
import appError from '../../ErrorHandler/AppError';
import httpStatus from 'http-status';

export const registerUser = async (
  username: string,
  email: string,
  password: string,
): Promise<any> => {
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  return newUser;
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<{ token: string; user: TUser }> => {
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new appError(httpStatus.NOT_FOUND, 'Invalid credentials');
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    config.jwt_access_secret as string,
    {
      expiresIn: '1h',
    },
  );

  return {
    token,
    user,
  };
};
