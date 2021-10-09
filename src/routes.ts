import { Router } from 'express';

import SatSearchController from './app/controllers/SatSearchController';

const router = Router();

router.post('/satSearch', SatSearchController.index)

export default router;