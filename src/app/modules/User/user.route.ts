import express from 'express';
import { UserControllers } from './user.controller';

export const router = express.Router();
router.post('/', UserControllers.authUserRegister);
router.get('/', UserControllers.getAllUsers);

export const UserRoutes = router;
