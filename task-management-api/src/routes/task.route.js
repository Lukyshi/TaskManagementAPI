import express from 'express';
import { Router } from 'express';
const router = Router();
import taskController from '../controllers/task.controller.js';


router.get('/', taskController.getAllTasks);

router.get('/:id', taskController.getTaskById);

router.post('/', taskController.createTask);

router.put('/:id', taskController.updateTask);

router.delete('/:id', taskController.deleteTask);

export default router;
