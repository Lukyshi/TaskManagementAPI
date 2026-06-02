import taskService from '../services/task.service.js';

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks(
      req.user.id,
      req.query.page,
      req.query.limit
    );

    res.status(200).json({
      success: true,
      data: tasks,
      pagination: result.pagination
    });
  } catch (error) {
    next(error);
  }
}

const getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message : 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
}

const createTask = async (req, res, next) => {

  try {
    const user = req.body
    const task = await taskService.createTask(user);

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
}

const updateTask = async (req, res, next) => {

  try {
    const id = req.params.id;
    const taskData = req.body
    const task = await taskService.updateTask(id, taskData);

    if (!task) {
      return res.status(404).json({
        success: false,
        message : 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      data: task
    })
  } catch (error) {
    next(error);
  }
}

const deleteTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const task = await taskService.deleteTask(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message : 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    next(error);
  }
}

export default {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
}



