import { Router, Response, response } from 'express';
import UserController from './app/controllers/UserController';

import Landsat8Controller from './app/controllers/satellites/Landsat8Controller';
import Sentinel2Controller from './app/controllers/satellites/Sentinel2Controller';
import Cbers4Controller from './app/controllers/satellites/Cbers4Controller';


const router = Router();

router.get('/users', UserController.index)
router.post('/users', UserController.store);

router.get('/landsat8', Landsat8Controller.index)
router.get('/sentinel2', Sentinel2Controller.index)
router.get('/cbers4', Cbers4Controller.index)

export default router;