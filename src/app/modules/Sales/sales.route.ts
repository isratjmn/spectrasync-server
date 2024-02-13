import express from 'express';
import * as salesController from './sales.controller';
import authGuard from '../../../Middleware/AuthGuard';

const router = express.Router();
router.post('/', salesController.addSaleController);
router.get('/', authGuard('user'), salesController.getAllSalesController);
// Routes for fetching sales history
router.get('/daily', salesController.getDailyHistory);
router.get('/weekly', salesController.getWeeklyHistory);
router.get('/monthly', salesController.getMonthlyHistory);
router.get('/yearly', salesController.getYearlyHistory);

export const salesRoutes = router;
