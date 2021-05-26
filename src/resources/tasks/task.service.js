/** @module TaskService */
const tasksRepo = require('./task.memory.repository');

/**
 * Returns a function that returns all tasks
 * @returns {Function}
 */
const getAll = () => tasksRepo.getAll();

/**
 * Returns a function that returns task by id
 * @param {string} id Task's id
 * @returns {Function}
 */
const getOne = (id) => tasksRepo.getOne(id);

/**
 * Returns a function that creates new task and returns it
 * @param {Object} task Task object
 * @returns {Function}
 */
const createTask = (task) => tasksRepo.createTask(task);

/**
 * Returns a function that updates task with new info
 * @param {string} id Task's id
 * @param {Object} updatedInfo Task's new info
 * @returns {Function}
 */
const updateTask = (id, updatedInfo) => tasksRepo.updateTask(id, updatedInfo);

/**
 * Returns a function that deletes a task
 * @param {string} id Task's id
 * @returns {Function}
 */
const deleteTask = (id) => tasksRepo.deleteTask(id);

module.exports = { getAll, getOne, createTask, updateTask, deleteTask };
