/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: "user" | "manager";
}

export type TLoginUser = {
  email: string;
  password: string;
};

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
