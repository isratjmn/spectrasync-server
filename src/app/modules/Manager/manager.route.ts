import express from 'express';
import { ManagerControllers } from './manager.controller';

const router = express.Router();

router.post('/', ManagerControllers.createManager);
router.get('/', ManagerControllers.getAllManagers);
export const ManagerRoute = router;
