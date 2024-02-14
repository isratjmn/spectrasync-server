/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import config from '../../config';
import bcrypt from 'bcrypt';
import { TManager } from './manager.interface';

const managerSchema = new Schema<TManager>(
  {
    id: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, 'Please Provide a Password'],
      select: 0,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

managerSchema.pre('save', async function (next) {
  const manager = this;
  manager.password = await bcrypt.hash(
    manager.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

export const Manager = model<TManager>('manager', managerSchema);
