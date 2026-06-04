
 //require('dotenv').config();
 import dotenv from 'dotenv';
 dotenv.config();
 
 import express from 'express';
 import authRoutes from './routes/auth.route.js';
 import taskRoutes from './routes/task.route.js';
 import errorMiddleware from './middleware/error.middleware.js';
 import rateLimiter from './middleware/rateLimiter.js';

 const app = express();

 app.use(express.json());

 app.use(rateLimiter);

 app.use('/api/auth', authRoutes);
 
 app.use('/api/tasks', taskRoutes);

 app.use(errorMiddleware);

 export default app;