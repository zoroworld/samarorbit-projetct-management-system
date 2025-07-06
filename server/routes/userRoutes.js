import { register, login, getDashboard, getAllUserController, updateUserController, deleteUserController} from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import checkRole from '../middleware/roleMiddleware.js';

import express from 'express';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/dashboard', authenticate, checkRole("admin") , getDashboard);
router.get('/', authenticate, checkRole("admin"), getAllUserController);
router.put('/:id', authenticate, checkRole("admin"), updateUserController);
router.delete('/:id', authenticate, checkRole("admin"), deleteUserController);

export default router;