import express from 'express';
import { authUserControllers } from './user.controller';

export const router = express.Router();
router.post('/', authUserControllers.authUserRegister);
export const UserRoutes = router;
