import mongoose, { Schema, Document } from 'mongoose';
import { MAIN_ROLE } from './user.constant';
import bcrypt from 'bcrypt';
import config from '../../config';

// Define TUser interface
export interface TUser extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: 'user' | 'manager';
  createdAt: Date;
  updatedAt: Date;
}

// Define UserSchema
const UserSchema = new Schema<TUser>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(MAIN_ROLE),
      default: MAIN_ROLE.user,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

UserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

UserSchema.statics.isUserExists = async function (username: string) {
  const existingUser = await User.findOne({ username });
  return existingUser;
};

UserSchema.statics.isPasswordMatched = async function (
  plainTextPass: string,
  hashedPass: string,
) {
  const isMatched = await bcrypt.compare(plainTextPass, hashedPass);
  return isMatched;
};

UserSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTimes =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTimes > jwtIssuedTimestamp;
};

export type TUserRole = keyof typeof MAIN_ROLE;

export const User = mongoose.model<TUser>('User', UserSchema);
