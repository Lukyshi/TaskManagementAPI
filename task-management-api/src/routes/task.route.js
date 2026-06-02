import express from 'express';
import { Router } from 'express';
const router = Router();
import taskController from '../controllers/task.controller.js';


router.get('/tasks', taskController.getAllTasks);

router.get('/tasks/:id', taskController.getTaskById);

router.post('/tasks', taskController.createTask);

router.put('/tasks/:id', taskController.updateTask);

router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
