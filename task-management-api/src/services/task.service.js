const { parse } = require('node:path');
const prisma = require('../prisma/client');

// find all tasks
exports.getAllTasks = async (userId) => {
  return await prisma.task.findMany({
    where: {
      userId,
      deletedAt: null
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};


// find task by id
exports.getTaskById =  async (id, userId) => {
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
exports.createTask = async (data) => {
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
exports.updateTask = async (id, userId, data) => {
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
exports.deleteTask = async (id, userId) => {
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

