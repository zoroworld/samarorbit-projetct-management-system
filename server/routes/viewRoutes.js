import express from 'express';
   
import { authenticate } from '../middleware/authMiddleware.js';
// Import the role middleware
import checkRole from '../middleware/roleMiddleware.js';
import { getAllStatsController } from '../controllers/viewController.js';

const router = express.Router();

router.get('/stats', authenticate, checkRole("admin") , getAllStatsController);


export default router;
