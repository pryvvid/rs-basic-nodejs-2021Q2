/** @module BoardService */
const boardsRepo = require('./board.memory.repository');
const { deleteTasksByBoardId } = require('../tasks/task.memory.repository');

/**
 * Returns a promise contains all boards
 * @returns {Promise<Array<Object>>} Promise of array contains all boards
 */
const getAll = async () => boardsRepo.getAll();

/**
 * Returns a promise contains board found by id or null
 * @param {string} id Board's id
 * @returns {Promise<Object|null>} Promise of board object or null
 */
const getOne = async (id) => boardsRepo.getOne(id);

/**
 * Returns a promise contains created board
 * @param {Object} task Board object
 * @returns {Promise<Object>} Promise of created board
 */
const createBoard = async (board) => boardsRepo.createBoard(board);

/**
 * Returns a promise contains updated board
 * @param {string} id Board's id
 * @param {Object} updatedInfo Board's new info
 * @returns {Promise<Object>} Promise of updated board
 */
const updateBoard = async (id, updatedInfo) => boardsRepo.updateBoard(id, updatedInfo);

/**
 * Calls two functions
 * First deletes tasks with property of board's id
 * Second deletes board from database
 * @param {string} id User's id
 * @returns {Promise<void>} Promise of void
 */
const deleteBoard = async (id) => {
  await deleteTasksByBoardId(id)
  await boardsRepo.deleteBoard(id);
}

module.exports = { getAll, getOne, createBoard, updateBoard, deleteBoard };
