/** @module TaskService */
const tasksRepo = require('./task.memory.repository');

/**
 * Returns a promise contains all tasks
 * @returns {Promise<Array<Object>>} Promise of array contains all tasks
 */
const getAll = async () => tasksRepo.getAll();

/**
 * Returns a promise contains task found by id or null
 * @param {string} id Task's id
 * @returns {Promise<Object|null>} Promise of task object or null
 */
const getOne = async (id) => tasksRepo.getOne(id);

/**
 * Returns a promise contains created task
 * @param {Object} task Task object
 * @returns {Promise<Object>} Promise of created task
 */
const createTask = async (task) => tasksRepo.createTask(task);

/**
 * Returns a promise contains updated task
 * @param {string} id Task's id
 * @param {Object} updatedInfo Task's new info
 * @returns {Promise<Object>} Promise of updated task
 */
const updateTask = async (id, updatedInfo) => tasksRepo.updateTask(id, updatedInfo);

/**
 * Returns a promise that deletes a task
 * @param {string} id Task's id
 * @returns {Promise<void>} Promise of void
 */
const deleteTask = async (id) => tasksRepo.deleteTask(id);

module.exports = { getAll, getOne, createTask, updateTask, deleteTask };
