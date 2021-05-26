const Task = require('./task.model');

let taskDB = [];

/**
 * Returns all tasks from database
 * @returns {Array<object>} all tasks
 */
const getAll = async () => {
  const DB = await taskDB;
  return DB;
};

/**
 * Finds task by id and returns it
 * @param {string} id task's id
 * @returns {object|null} task object or null
 */
const getOne = async (id) => {
  let task = null;
  try {
    task = await taskDB.find((t) => t.id === id);
  } catch (e) {
    process.stderr.write(e);
  }
  return task;
};

/**
 * Creates new task from object
 * Adds it to database
 * Returns created task
 * @param {
 *  {
 *    title: string, 
 *    order: number, 
 *    description: string,
 *    userId: string,
 *    boardId: string,
 *    columnId: string
 *  }
 * } task object with properties 'title, order, description, userId, boardId, columnId'
 * @returns {object} created task
 */
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

/**
 * Finds task by id and updates it with new info
 * Returns updated task
 * @param {stirng} id 
 * @param {object} newTaskInfo 
 * @returns {object} updated task
 */
const updateTask = async (id, newTaskInfo) => {
  const taskIndex = await taskDB.findIndex((task) => task.id === id);
  const updatedTask = {
    ...taskDB[taskIndex],
    ...newTaskInfo,
  };
  taskDB[taskIndex] = updatedTask;
  return updateTask;
};

/**
 * Deletes task from database
 * @param {string} id task's id
 * @returns {void}
 */
const deleteTask = async (id) => {
  taskDB = await taskDB.filter((task) => task.id !== id);
};

/**
 * Deletes task by board's id from database
 * @param {string} boardId board's id
 * @returns {void}
 */
const deleteTasksByBoardId = async (boardId) => {
  taskDB = await taskDB.filter((task) => task.boardId !== boardId);
};

/**
 * Sets task's property 'userId' to null
 * @param {string} userId user's id
 * @returns {void}
 */
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
