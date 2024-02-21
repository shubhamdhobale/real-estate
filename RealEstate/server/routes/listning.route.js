import express from 'express';
import { createlisting } from '../controllers/listning.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create-listing', verifyToken, createlisting);

export default router;