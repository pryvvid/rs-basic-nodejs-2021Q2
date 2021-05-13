const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const getOne = (id) => boardsRepo.getOne(id);

const createBoard = (board) => boardsRepo.createBoard(board);

const updateBoard = (id, updatedInfo) => boardsRepo.updateBoard(id, updatedInfo);

const deleteBoard = (id) => boardsRepo.deleteBoard(id);

module.exports = { getAll, getOne, createBoard, updateBoard, deleteBoard };
