import httpStatus from 'http-status';
import appError from '../../ErrorHandler/AppError';
import SaleModel, { Sale, SaleDocument } from './sales.model';
import { EyeglassesModel } from '../EyeGlasses/eyeglasses.model';

export const addSale = async (saleData: Sale) => {
  const { eyeglassId, quantity } = saleData;
  const eyaGlasses = await EyeglassesModel.findById(eyeglassId);
  console.log(eyeglassId);
  if (!eyaGlasses || eyaGlasses.quantity < quantity) {
    throw new appError(
      httpStatus.NOT_FOUND,
      'nvalid product or insufficient quantity',
    );
  }
  // Create sale record
  const eyeGlassQuantity = eyaGlasses.quantity - quantity;
  await EyeglassesModel.findByIdAndUpdate(eyeglassId, {
    quantity: eyeGlassQuantity,
  });
  const sale = await SaleModel.create(saleData);
  return sale;
};

export const getAllSales = async (): Promise<SaleDocument[]> => {
  try {
    const allSales = await SaleModel.find();
    return allSales;
  } catch (error: any) {
    throw new Error(`Error getting all sales: ${error.message}`);
  }
};

export const getDailySalesHistory = async () => {
  try {
    // Get the current date in the user's timezone
    const today = new Date();
    console.log(today);

    // Set the start of the day to 00:00:00
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      0,
      0,
      0,
    );
    // Set the end of the day to 23:59:59
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
      59,
      59,
    );
    // Find sales data within the range of the current day
    const sales = await SaleModel.find({
      saleDate: { $gte: startOfDay, $lte: endOfDay },
    });
    return sales;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const getWeeklySalesHistory = async () => {
  const today = new Date();
  const startOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay(),
  );
  const endOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() + 7,
  );
  const sales = await SaleModel.find({
    saleDate: { $gte: startOfWeek, $lt: endOfWeek },
  });
  return sales;
};

// Get monthly sales history
export const getMonthlySalesHistory = async () => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const sales = await SaleModel.find({
    saleDate: { $gte: startOfMonth, $lte: endOfMonth },
  });
  return sales;
};

// Get yearly sales history
export const getYearlySalesHistory = async () => {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const endOfYear = new Date(today.getFullYear(), 11, 31);
  const sales = await SaleModel.find({
    saleDate: { $gte: startOfYear, $lte: endOfYear },
  });
  return sales;
};
