import express from 'express';
import logger from './logger/log.js';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import dbconnect from './config/dbconnect.js';
import requestLogger  from './middleware/loggerMiddleware.js';
import projectRoutes from './routes/projectRoutes.js';
import userRoutes from './routes/userRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import viewRoutes from './routes/viewRoutes.js';



dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


// Connect to MongoDB
dbconnect(mongoose, logger);
app.use(requestLogger);


// Define a simple route
// app.get('/', (req, res) => {
//     res.send('Welcome to the Project Management API');
//     }
// );


// Import routes
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/logs', activityRoutes);
app.use('/api/v1/view', viewRoutes);



// Start the server
logger.info(`✅ Server is running on  http://localhost:${PORT}`)
app.listen(PORT, () => {
    // logger.info(`✅ Server is running on  http://localhost:${PORT}`);
    console.log(`✅ Server is running on  http://localhost:${PORT}`);
});

