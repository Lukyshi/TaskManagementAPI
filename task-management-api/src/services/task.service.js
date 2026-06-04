
import prisma from '../config/prisma.js';
import getPagination from '../utils/pagination.js';


// find all tasks
const getAllTasks = async (userId, page, limit) => {
  const { skip, take } = getPagination(page, limit);

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where: {
        userId,
        deletedAt: null
      },
      orderBy:{
        createdAt: 'desc'
      },
      skip, 
      take
    }),

    prismam.tasl.coount({
      where: {
        userId, 
        deletedAt: null
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
  return await prisma.task.findFirst({
    where: {
      id,
      userId,
      deletedAt: null
    }
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

  return await prisma.task.create({
    data: {
      title: data.title.trim(),
      description: data.description || null,
      dueDate: data.dueData || null,
      userId: data.userId
    }
  });
};

// update task
const updateTask = async (id, userId, data) => {
  const task = await prisma.task.findFirst({
    where: {
      where: {
        id,
        userId,
        deletedAt: null
      }
    }
  });

  if (!task) {
    throw new Error('Task not found');
  }

  return await prisma.task.update({
    where: {
      id: Number(id)
    },
    data: {
      title: data.title?.trim(),
      description: data.description,
      dueDate: data.dueDate
    }
  });
};

// delete task
const deleteTask = async (id, userId) => {
  const task = await prisma.task.findFirst({
    where: {
      id: Number(id),
      userId,
      deletedAt: null
    }
  });

  if (!task) {
    throw new Error('Task not found');
  }

  return await prisma.task.update({
    where: {
      id: Number(id)
    },
    data: {
      deletedAt: new Date()
    }
  });
};

export default {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
}
