const Board = require('./board.model');

let boardDB = [];

/**
 * Returns all boards from database
 * @returns {Array<object>} all boards
 */
const getAll = async () => {
  const DB = await boardDB;
  return DB;
};

/**
 * Finds board by id and returns it
 * @param {string} id board's id
 * @returns {object|null} board object or null
 */
const getOne = async (id) => {
  let board = null;
  try {
    board = await boardDB.find((b) => b.id === id);
  } catch (e) {
    process.stderr.write(e);
  }
  return board;
};

/**
 * Creates new board from object
 * Adds it to database
 * Returns created board
 * @param {
 *  {
 *    title: string, 
 *    columns: Array<Object>, 
 *  }
 * } task object with properties 'title, columns'
 * @returns {object} created board
 */
const createBoard = async ({ title, columns }) => {
  await boardDB.push(new Board({ title, columns }));
  return boardDB[boardDB.length - 1];
};

/**
 * Finds board by id and updates it with new info
 * Returns updated board
 * @param {stirng} id 
 * @param {object} newBoardInfo 
 * @returns {object} updated board
 */
const updateBoard = async (id, newBoardInfo) => {
  const boardIndex = await boardDB.findIndex((board) => board.id === id);
  const updatedBoard = {
    ...boardDB[boardIndex],
    ...newBoardInfo,
  };
  boardDB[boardIndex] = updatedBoard;
  return updatedBoard;
};

/**
 * Deletes board from database
 * @param {string} id board's id
 * @returns {void}
 */
const deleteBoard = async (id) => {
  boardDB = await boardDB.filter((board) => board.id !== id);
};

module.exports = { getAll, getOne, createBoard, updateBoard, deleteBoard };
