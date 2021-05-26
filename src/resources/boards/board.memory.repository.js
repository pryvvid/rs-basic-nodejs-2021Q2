/** @module BoardRepository */
const Board = require('./board.model');

let boardDB = [];

/**
 * Returns all boards from database
 * @returns {Array<Object>} all boards
 */
const getAll = async () => {
  const DB = await boardDB;
  return DB;
};

/**
 * Finds board by id and returns it
 * @param {string} id board's id
 * @returns {Object|null} board object or null
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
 * @param {Object} board Object with properties 'id, title, columns'
 * @param {string} board.title Board's title
 * @param {Array<Object>} board.columns Board's columns
 * @returns {Object} created board
 */
const createBoard = async ({ title, columns }) => {
  await boardDB.push(new Board({ title, columns }));
  return boardDB[boardDB.length - 1];
};

/**
 * Finds board by id and updates it with new info
 * Returns updated board
 * @param {stirng} id 
 * @param {Object} newBoardInfo 
 * @returns {Object} updated board
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
