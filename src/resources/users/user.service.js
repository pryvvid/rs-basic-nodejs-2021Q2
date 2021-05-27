/** @module UserService */
const usersRepo = require('./user.memory.repository');
const { setUserIdToNull } = require('../tasks/task.memory.repository');

/**
 * Returns a promise of array contains all users
 * @returns {Promise<Array<object>>} Promise of array contains all users
 */
const getAll = async () => usersRepo.getAll();

/**
 * Returns a promise that contains user found by id or null
 * @param {string} id User's id
 * @returns {Promise<Object|null>} Promise of user object or null
 */
const getOne = async (id) => usersRepo.getOne(id);

/**
 * Returns a promise contains created user
 * @param {Object} user User object
 * @returns {Promise<Object>} Promise of created user
 */
const createUser = async (user) => usersRepo.createUser(user);

/**
 * Returns a promise of updated user
 * @param {string} id User's id
 * @param {Object} updatedInfo User's new info
 * @returns {Promise<Object>} Promise of updated user
 */
const updateUser = async (id, updatedInfo) => usersRepo.updateUser(id, updatedInfo);

/**
 * Calls two async functions
 * First sets 'user_id' property of Task object to null
 * Second deletes user from database
 * @param {string} id User's id
 * @returns {Promise<void>} Promise of void
 */
const deleteUser = async (id) => {
  await setUserIdToNull(id);
  await usersRepo.deleteUser(id);
};

module.exports = { getAll, getOne, createUser, updateUser, deleteUser };
