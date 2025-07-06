import express from 'express';
import { getAllProjects, 
    getAllProjectAssignToUserController , 
    projectWithTaskController ,
    createProject, getProjectById, 
    updateProject, deleteProject } from '../controllers/projectController.js';
    
import { authenticate } from '../middleware/authMiddleware.js';
// Import the role middleware
import checkRole from '../middleware/roleMiddleware.js';

const router = express.Router();


// Protected route

router.get('/', authenticate , getAllProjects);
router.post('/', authenticate, checkRole('admin') , createProject);
router.get('/:id', authenticate, checkRole('admin') , getProjectById);
router.delete('/:id', authenticate, checkRole('admin'),  deleteProject);
router.put('/:id', authenticate, checkRole('admin') , updateProject);
router.get('/:id/tasks', authenticate, checkRole('admin') , projectWithTaskController);
router.get('/user/:id', authenticate, checkRole('admin','member') , getAllProjectAssignToUserController);


export default router;
