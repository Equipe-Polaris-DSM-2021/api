import { Router, Response, response } from 'express';
import UserController from './app/controllers/UserController';

const router = Router();

router.get('/users', UserController.index)
router.post('/users', UserController.store);

export default router;