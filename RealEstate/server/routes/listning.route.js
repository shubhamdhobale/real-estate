import express from 'express';
import { createlisting } from '../controllers/listning.controller.js';
import { verifyToken } from '../utils/VerifyUser.js';

const router = express.Router();

router.post('/create-listing', verifyToken, createlisting);

export default router;