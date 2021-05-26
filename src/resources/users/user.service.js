/** @module UserService */
const usersRepo = require('./user.memory.repository');
const { setUserIdToNull } = require('../tasks/task.memory.repository');

/**
 * Returns a function that returns all users
 * @returns {Function}
 */
const getAll = () => usersRepo.getAll();

/**
 * Returns a function that returns user by id
 * @param {string} id User's id
 * @returns {Function}
 */
const getOne = (id) => usersRepo.getOne(id);

/**
 * Returns a function that creates new user and returns it
 * @param {Object} user User object
 * @returns {Function}
 */
const createUser = (user) => usersRepo.createUser(user);

/**
 * Returns a function that updates user with new info
 * @param {string} id User's id
 * @param {Object} updatedInfo User's new info
 * @returns {Function}
 */
const updateUser = (id, updatedInfo) => usersRepo.updateUser(id, updatedInfo);

/**
 * Calls two functions
 * First sets 'user_id' property of Task object to null
 * Second deletes user from database
 * @param {string} id User's id
 * @returns {void}
 */
const deleteUser = (id) => {
  setUserIdToNull(id);
  usersRepo.deleteUser(id);
};

module.exports = { getAll, getOne, createUser, updateUser, deleteUser };
