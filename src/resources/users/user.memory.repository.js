const User = require('./user.model');

let userDB = [];

/**
 * Returns all users from database
 * @returns {Array<object>} all users
 */
const getAll = async () => {
  const DB = await userDB;
  return DB;
};

/**
 * Finds user by id and returns it
 * @param {string} id user's id
 * @returns {object|null} user object or null
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
 * @param {{name: string, login: string, password: string}} user object with properties 'name, login, password'
 * @returns {object} created user
 */
const createUser = async ({ name, login, password }) => {
  await userDB.push(new User({ name, login, password }));
  return userDB[userDB.length - 1];
};

/**
 * Finds user by id and updates it with new info
 * Returns updated user
 * @param {stirng} id 
 * @param {object} newUserInfo 
 * @returns {object} updated user
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
 * @returns {void}
 */
const deleteUser = async (id) => {
  userDB = await userDB.filter((user) => user.id !== id);
};

module.exports = { getAll, getOne, createUser, updateUser, deleteUser };
