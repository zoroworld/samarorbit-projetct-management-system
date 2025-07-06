import express from 'express';

import { authenticate } from '../middleware/authMiddleware.js';
// Import the role middleware
import checkRole from '../middleware/roleMiddleware.js';
import { getAllTaskController, getAllTaskAssignToUserController ,createTaskController, updateTaskController, deleteTaskController } from '../controllers/taskController.js';

const router = express.Router();

// auth route
router.get('/', authenticate, checkRole('admin','member') , getAllTaskController);
router.post('/', authenticate, checkRole('admin'), createTaskController);
router.put('/:id', authenticate, checkRole('admin','member'), updateTaskController);
router.delete('/:id', authenticate, checkRole('admin'), deleteTaskController);
router.get('/user/:id', authenticate, checkRole('admin','member') , getAllTaskAssignToUserController);


export default router;



