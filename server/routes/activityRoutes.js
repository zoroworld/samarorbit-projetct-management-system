import express from 'express';
import { getActiveLogsController } from '../controllers/logController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import checkRole from '../middleware/roleMiddleware.js';

const router = express.Router();

// 👇 Only admins can access this route
router.get('/', authenticate, checkRole('admin','member'), getActiveLogsController);

export default router;
