const usersRepo = require('./user.memory.repository');
const { setUserIdToNull } = require('../tasks/task.memory.repository');

const getAll = () => usersRepo.getAll();

const getOne = (id) => usersRepo.getOne(id);

const createUser = (user) => usersRepo.createUser(user);

const updateUser = (id, updatedInfo) => usersRepo.updateUser(id, updatedInfo);

const deleteUser = (id) => {
  setUserIdToNull(id);
  usersRepo.deleteUser(id);
};

module.exports = { getAll, getOne, createUser, updateUser, deleteUser };
