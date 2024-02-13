import mongoose, { Document, Schema, Types } from 'mongoose';
export interface Sale {
  eyeglassId?: Types.ObjectId;
  quantity: number;
  buyerName: string;
  saleDate: Date;
}

export interface SaleDocument extends Sale, Document {}
const saleSchema = new Schema({
  eyeglassId: {
    type: Schema.Types.ObjectId,
    ref: 'Eyeglasses',
  },
  quantity: {
    type: Number,
    required: true,
  },
  buyerName: {
    type: String,
    required: true,
  },
  saleDate: {
    type: Date,
    required: true,
  },
});
const SaleModel = mongoose.model<SaleDocument>('Sale', saleSchema);
export default SaleModel;
