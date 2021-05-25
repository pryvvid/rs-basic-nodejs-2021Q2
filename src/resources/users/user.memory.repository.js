const User = require('./user.model');

let userDB = [];

const getAll = async () => {
  const DB = await userDB;
  return DB;
};

const getOne = async (id) => {
  let user = null;
  try {
    user = await userDB.find((u) => u.id === id);
  } catch (e) {
    process.stderr.write(e);
  }
  return user;
};

const createUser = async ({ name, login, password }) => {
  await userDB.push(new User({ name, login, password }));
  return userDB[userDB.length - 1];
};

const updateUser = async (id, newUserInfo) => {
  const userIndex = await userDB.findIndex((user) => user.id === id);
  const updatedUser = {
    ...userDB[userIndex],
    ...newUserInfo,
  };
  userDB[userIndex] = updatedUser;
  return updatedUser;
};

const deleteUser = async (id) => {
  userDB = await userDB.filter((user) => user.id !== id);
};

module.exports = { getAll, getOne, createUser, updateUser, deleteUser };
