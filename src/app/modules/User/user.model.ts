import mongoose, { Schema, Document } from 'mongoose';
import { ROLE } from './user.constant';

export interface TUser extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: TRole;
}

const UserSchema = new Schema<TUser>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(ROLE),
    default: 'user',
  },
});

const User = mongoose.model<TUser>('User', UserSchema);
export type TRole = keyof typeof ROLE;
export { User };
