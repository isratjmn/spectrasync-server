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
import authGuard from '../../../Middleware/AuthGuard';
import { MAIN_ROLE } from '../User/user.constant';
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

router.get(
  '/',
  authGuard(MAIN_ROLE.manager),
  getAllEyeglassesDB,
);

router.get('/:id', getEyeGlass);
router.put('/:eyeglassId', updateEyeGlass);
router.delete('/', deleteEyeGlass);
router.delete('/:id', deleteSingleEyeGlass);

export const eyeGlassesRoutes = router;
