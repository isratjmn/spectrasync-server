import express, { NextFunction, Request, Response, Router } from 'express';
import {
  addEyeglasses,
  deleteEyeGlass,
  deleteSingleEyeGlass,
  getAllEyeglassesDB,
  getEyeGlass,
  updateEyeGlass,
} from './eyeglasses.controller';
import { upload } from '../../utils/SendImageCloud';
const router: Router = express.Router();
// Create a new pair of eyeglasses
router.post(
  '/',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  addEyeglasses,
);
// Get all eyeglasses
router.get('/', getAllEyeglassesDB);
// Route for fetching a single eyeglass by ID
router.get('/:id', getEyeGlass);
router.put('/:eyeglassId', updateEyeGlass);
router.delete('/', deleteEyeGlass);
router.delete('/:id', deleteSingleEyeGlass);

export const eyeGlassesRoutes = router;
