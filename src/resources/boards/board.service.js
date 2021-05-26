/** @module BoardService */
const boardsRepo = require('./board.memory.repository');
const { deleteTasksByBoardId } = require('../tasks/task.memory.repository');

/**
 * Returns a function that returns all boards
 * @returns {Function}
 */
const getAll = () => boardsRepo.getAll();

/**
 * Returns a function that returns board by id
 * @param {string} id Board's id
 * @returns {Function}
 */
const getOne = (id) => boardsRepo.getOne(id);

/**
 * Returns a function that creates new board and returns it
 * @param {Object} task Board object
 * @returns {Function}
 */
const createBoard = (board) => boardsRepo.createBoard(board);

/**
 * Returns a function that updates board with new info
 * @param {string} id Board's id
 * @param {Object} updatedInfo Board's new info
 * @returns {Function}
 */
const updateBoard = (id, updatedInfo) => boardsRepo.updateBoard(id, updatedInfo);

/**
 * Calls two functions
 * First deletes tasks with property of board's id
 * Second deletes board from database
 * @param {string} id User's id
 * @returns {void}
 */
const deleteBoard = (id) => {
  deleteTasksByBoardId(id)
  boardsRepo.deleteBoard(id);
}

module.exports = { getAll, getOne, createBoard, updateBoard, deleteBoard };
