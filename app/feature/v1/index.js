import express from 'express';

import nodeRouter from './node';
import cityRouter from './city';


const router = express.Router();

router.use('/cities', cityRouter);
router.use('/nodes', nodeRouter);

export default router;
