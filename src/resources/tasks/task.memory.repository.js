const Task = require('./task.model');

let taskDB = [];

const getAll = async () => {
  const DB = await taskDB;
  return DB;
};

const getOne = async (id) => {
  let task = null;
  try {
    task = await taskDB.find((t) => t.id === id);
  } catch (e) {
    process.stderr.write(e);
  }
  return task;
};

const createTask = async ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}) => {
  const newTask = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });
  await taskDB.push(newTask);
  return taskDB[taskDB.length - 1];
};

const updateTask = async (id, newTaskInfo) => {
  const taskIndex = await taskDB.findIndex((task) => task.id === id);
  const updatedTask = {
    ...taskDB[taskIndex],
    ...newTaskInfo,
  };
  taskDB[taskIndex] = updatedTask;
  return updateTask;
};

const deleteTask = async (id) => {
  taskDB = await taskDB.filter((task) => task.id !== id);
};

const deleteTasksByBoardId = async (boardId) => {
  taskDB = await taskDB.filter((task) => task.boardId !== boardId);
};

const setUserIdToNull = (userId) => {
  taskDB = taskDB.map((task) => {
    if (task.userId === userId) {
      return { ...task, userId: null };
    }
    return task;
  });
};

module.exports = {
  getAll,
  getOne,
  createTask,
  updateTask,
  deleteTask,
  deleteTasksByBoardId,
  setUserIdToNull,
};
