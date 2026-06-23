
import prisma from '../config/prisma.js';
import pagination from '../utils/pagination.js';


// find all tasks
const getAllTasks = async (userId, page, limit) => {
  const { skip, take } = pagination.getPagination(page, limit);

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where: {
        userId,
        deleteAt: null
      },
      orderBy:{
        createdAt: 'desc'
      },
      skip, 
      take
    }),

    prisma.task.count({
      where: {
        userId, 
        deleteAt: null
      }
    })
  ]);

  return {
    tasks,
    pagination: {
    page: Number(page) || 1,
    limit: Number(limit) || 10,
    total,
    totalPages: Math.ceil(total / (limit || 10))
    }
  };
};


// find task by id
const getTaskById =  async (id, userId) => {
  const task = await prisma.task.findFirst({
    where: {
      id,
      userId,
      deleteAt: null
    },
  });

  if (!task) {
    throw new Error('Task not found');
  }
  return task;
};

// create task
const createTask = async (data) => {
  if(!data.title || data.title.trim() === '') {
    throw new Error('Title is required');
  }
   // ill add transaction acid principle
  return await prisma.$transaction(async (tx) => {

    const task = await tx.task.create({
    data: {
      title: data.title.trim(),
      description: data.description || null,
      dueDate: data.dueDate || null,
      userId: data.userId
    }
  });

   await tx.activityLog.create({
    data : {
      userId : data.userId,
      taskId : task.id,
      action : 'TASK_CREATED'
    } 
  });

    return task;

  });
};

// update task
// i need to test updateTask
const updateTask = async (id, userId, data) => {
  const task = await prisma.task.findFirst({
      where: {
        id: Number(id),
        userId,
        deleteAt: null
    }
  });

  if (!task) {
    throw new Error('Task not found');
  }

  //prisma.$transaction(async (tx) => {})
  return await prisma.$transaction(async (tx) => {

    const updatedTask = await tx.task.update({
    where: {
      id: Number(id) 
    },
    data: {
      title: data.title?.trim(),
      description: data.description,
      dueDate: data.dueDate
    }
  });

    await tx.activityLog.create({
    data : {
      userId,
      taskId : updatedTask.id,
      action : 'TASK_UPDATED'
    }

  });

    return updatedTask;

  });
};

// delete task
const deleteTask = async (id, userId) => {
  const task = await prisma.task.findFirst({
    where: {
      id: Number(id),
      userId,
      deleteAt: null
    }
  });

  if (!task) {
    throw new Error('Task not found');
  }

  return await prisma.$transaction(async (tx) => {

    const deletedTask = await tx.task.update({
    where: {
      id: Number(id)
    },
    data: {
      deleteAt: new Date()
    }
  });

   await tx.activityLog.create({
    data : {
      userId,
      taskId : deletedTask.id,
      action : 'TASK_DELETED'
    }
  });

  return deletedTask;

  });
};

export default {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
}
