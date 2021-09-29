import { Router, Response, response } from 'express';

import UserController from './app/controllers/UserController';
import SatSearchController from './app/controllers/SatSearchController';

const router = Router();

router.get('/users', UserController.index)
router.post('/users', UserController.store);

router.get('/satSearch', SatSearchController.index)

export default router;