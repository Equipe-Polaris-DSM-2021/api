import { Router } from 'express';

import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';
import authMiddleware from './app/middlewares/AuthMiddleware';

import SatSearchController from './app/controllers/SatSearchController';
import ImageProcessController from './app/controllers/ImageProcessController';

const router = Router();

router.get('/users', authMiddleware,UserController.index);
router.post('/users', UserController.store);
router.put('/users/:id', authMiddleware, UserController.update);
router.post('/auth', AuthController.authenticate);

router.post('/satSearch', SatSearchController.index);
router.post('/imageProcess', ImageProcessController.index);

export default router;