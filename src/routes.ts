import { Router } from 'express';

import SatSearchController from './app/controllers/SatSearchController';
import ImageProcessController from './app/controllers/ImageProcessController';

const router = Router();

router.post('/satSearch', SatSearchController.index)
router.post('/imageProcess', ImageProcessController.index)

export default router;