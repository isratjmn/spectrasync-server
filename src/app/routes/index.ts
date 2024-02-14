import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { eyeGlassesRoutes } from '../modules/EyeGlasses/eyeglasses.route';
import { salesRoutes } from '../modules/Sales/sales.route';
import { UserRoutes } from '../modules/User/user.route';
import { ManagerRoute } from '../modules/Manager/manager.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/sales',
    route: salesRoutes,
  },
  {
    path: '/eye-glasses',
    route: eyeGlassesRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/manager',
    route: ManagerRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
