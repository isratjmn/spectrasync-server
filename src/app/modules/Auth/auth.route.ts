import express from 'express';
import { loginUserHandler, registerUserHandler } from './auth.controller';

const router = express.Router();

router.post('/login', loginUserHandler);
router.post('/register', registerUserHandler);

export const AuthRoutes = router;
