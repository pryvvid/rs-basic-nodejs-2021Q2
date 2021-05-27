/** @module TaskRepository */
const Task = require('./task.model');

let taskDB = [];

/**
 * Returns all tasks from database
 * @returns {Promise<Array<Object>|[]>} Promise of array contains all tasks
 */
const getAll = async () => {
  const DB = await taskDB;
  return DB;
};

/**
 * Finds task by id and returns it
 * @param {string} id task's id
 * @returns {Promise<Object|null>} Promise of task object or null
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
 * @param {Object} task Object with properties 'id, title, order, description, userId, boardId, columnId'
 * @param {string} task.id Task's id
 * @param {string} task.title Task's title
 * @param {number} task.order Task's order
 * @param {string} task.description Task's description
 * @param {string|null} task.userId Task's userId
 * @param {string|null} task.boardId Task's boardId
 * @param {string|null} task.columnId Task's columnId
 * @returns {Promise<Object>} Promise of created task
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
 * @param {stirng} id Task's id
 * @param {Object} newTaskInfo Task's new info
 * @returns {Promise<Object>} Promise of updated task
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
 * @returns {Promise<void>} Promise of void
 */
const deleteTask = async (id) => {
  taskDB = await taskDB.filter((task) => task.id !== id);
};

/**
 * Deletes task by board's id from database
 * @param {string} boardId board's id
 * @returns {Promise<void>} Promise of void
 */
const deleteTasksByBoardId = async (boardId) => {
  taskDB = await taskDB.filter((task) => task.boardId !== boardId);
};

/**
 * Sets task's property 'userId' to null
 * @param {string} userId user's id
 * @returns {Promise<void>} Promise of void
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
