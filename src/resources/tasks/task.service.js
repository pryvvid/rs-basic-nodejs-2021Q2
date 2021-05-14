const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();

const getOne = (id) => tasksRepo.getOne(id);

const createTask = (task) => tasksRepo.createTask(task);

const updateTask = (id, updatedInfo) => tasksRepo.updateTask(id, updatedInfo);

const deleteTask = (id) => tasksRepo.deleteTask(id);

module.exports = { getAll, getOne, createTask, updateTask, deleteTask };
