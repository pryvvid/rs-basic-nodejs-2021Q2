const Board = require('./board.model');

let boardDB = [];

const getAll = async () => {
  const DB = await boardDB;
  return DB;
};

const getOne = async (id) => {
  let board = null;
  try {
    board = await boardDB.find((b) => b.id === id);
  } catch (e) {
    process.stderr.write(e);
  }
  return board;
};

const createBoard = async ({ title, columns }) => {
  await boardDB.push(new Board({ title, columns }));
  return boardDB[boardDB.length - 1];
};

const updateBoard = async (id, newBoardInfo) => {
  const boardIndex = await boardDB.findIndex((board) => board.id === id);
  const updatedBoard = {
    ...boardDB[boardIndex],
    ...newBoardInfo,
  };
  boardDB[boardIndex] = updatedBoard;
  return updatedBoard;
};

const deleteBoard = async (id) => {
  boardDB = await boardDB.filter((board) => board.id !== id);
};

module.exports = { getAll, getOne, createBoard, updateBoard, deleteBoard };
