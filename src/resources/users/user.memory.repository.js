/** @module UserRepository */
const User = require('./user.model');

let userDB = [];

/**
 * Returns all users from database
 * @returns {Promise<Array<Object>|[]>} Promise of array contains all users
 */
const getAll = async () => {
  const DB = await userDB;
  return DB;
};

/**
 * Finds user by id and returns it
 * @param {string} id user's id
 * @returns {Promise<Object|null>} Promise of user object or null
 */
const getOne = async (id) => {
  let user = null;
  try {
    user = await userDB.find((u) => u.id === id);
  } catch (e) {
    process.stderr.write(e);
  }
  return user;
};

/**
 * Creates new user from object
 * Adds it to database
 * Returns created user
 * @param {Object} user Object with properties 'id, name, login, password'
 * @param {string} user.id User's id
 * @param {string} user.name User's name
 * @param {string} user.password User's password
 * @returns {Promise<Object>} Promise of created user
 */
const createUser = async ({ name, login, password }) => {
  await userDB.push(new User({ name, login, password }));
  return userDB[userDB.length - 1];
};

/**
 * Finds user by id and updates it with new info
 * Returns updated user
 * @param {string} id User's id
 * @param {Object} newUserInfo User's new info
 * @returns {Promise<Object>} Promise of updated user
 */
const updateUser = async (id, newUserInfo) => {
  const userIndex = await userDB.findIndex((user) => user.id === id);
  const updatedUser = {
    ...userDB[userIndex],
    ...newUserInfo,
  };
  userDB[userIndex] = updatedUser;
  return updatedUser;
};

/**
 * Deletes user from database
 * @param {string} id user's id
 * @returns {Promise<void>} Promise of void
 */
const deleteUser = async (id) => {
  userDB = await userDB.filter((user) => user.id !== id);
};

module.exports = { getAll, getOne, createUser, updateUser, deleteUser };
