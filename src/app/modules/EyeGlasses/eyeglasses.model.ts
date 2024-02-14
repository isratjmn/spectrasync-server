import { Schema, model, Document } from 'mongoose';
import {
  TFrameMaterial,
  TName,
  TGender,
  TBrand,
  TColor,
} from './eyeglasses.constant';

interface EyeglassesAttributes {
  name: typeof TName;
  profileImg?: string | null;
  price: number;
  quantity: number;
  frameMaterial: typeof TFrameMaterial;
  frameShape: string;
  lensType: string;
  brand: typeof TBrand;
  color: typeof TColor;
  priceRange: string;
  gender: typeof TGender;
  isDeleted?: boolean;
}
interface EyeglassesDocument extends Document, EyeglassesAttributes {}

const EyeglassesSchema = new Schema<EyeglassesDocument>(
  {
    name: {
      type: String,
      enum: TName,
      required: true,
    },
    profileImg: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    frameMaterial: {
      type: String,
      enum: TFrameMaterial,
      required: true,
    },
    frameShape: {
      type: String,
      required: true,
    },
    lensType: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      enum: TBrand,
      required: true,
    },
    color: {
      type: String,
      required: true,
      enum: TColor,
    },
    priceRange: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: TGender,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const EyeglassesModel = model<EyeglassesDocument>(
  'Eyeglasses',
  EyeglassesSchema,
);
export { EyeglassesModel, EyeglassesAttributes };
