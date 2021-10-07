import { Router } from 'express';

import SatSearchController from './app/controllers/SatSearchController';

const router = Router();

router.get('/satSearch', SatSearchController.index)

export default router;