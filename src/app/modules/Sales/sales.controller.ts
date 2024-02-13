import { Request, Response } from 'express';
import * as salesService from './sales.service';
import SaleModel, { Sale } from './sales.model';
import { Types } from 'mongoose';
import appError from '../../ErrorHandler/AppError';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { getWeeklySalesHistory } from './sales.service';

/* export const addSaleController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Call the addSale function with the file and sale data from the request body
    const saleData = req.body as Sale;
    // Call the addSale service function to add the sale
    const newSale = await salesService.addSale(saleData);
    res.status(201).json(newSale);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}; */

export const addSaleController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { eyeglassId, quantity, buyerName, saleDate } = req.body;
    const saleData: Sale = { eyeglassId, quantity, buyerName, saleDate };
    console.log(saleData);
    const sale = await salesService.addSale(saleData);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Sale is Created Successfully',
      data: sale,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const getAllSalesController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const allSales = await salesService.getAllSales();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Sales is Fetched Successfully!!!',
    data: allSales,
  });
};

export const getDailyHistory = async (req: Request, res: Response) => {
  const dailySales = await salesService.getDailySalesHistory();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Daily Sells History Fetched Successfully!!!',
    data: dailySales,
  });
};

export const getWeeklyHistory = async (req: Request, res: Response) => {
  const weeklySales = await salesService.getWeeklySalesHistory();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Weekly Sells History Fetched Successfully!!!',
    data: weeklySales,
  });
};

// Get monthly sales history
export const getMonthlyHistory = async (req: Request, res: Response) => {
  const monthlySales = await salesService.getMonthlySalesHistory();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Monthly Sells History Fetched Successfully!!!',
    data: monthlySales,
  });
};

// Get yearly sales history
export const getYearlyHistory = async (req: Request, res: Response) => {
  const yearlySales = await salesService.getWeeklySalesHistory();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Weekly Sells History Fetched Successfully!!!',
    data: yearlySales,
  });
};
