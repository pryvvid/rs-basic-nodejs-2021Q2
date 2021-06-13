/** @module BoardRepository */
import { Board, IBoard } from './board.model';

type CreatedBoard = {
  title: string,
  columns: Array<object>
}

let boardDB: Array<IBoard> = [];

/**
 * Returns all boards from database
 * @returns {Promise<Array<Object>|[]>} Promise of array contains all boards
 */
const getAll = async (): Promise<Array<IBoard> | []> => {
  const DB = await boardDB;
  return DB;
};

/**
 * Finds board by id and returns it
 * @param {string} id board's id
 * @returns {Promise<Object|null>} Promise of board object or null
 */
const getOne = async (id: string | undefined): Promise<IBoard | null | undefined> => {
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
 * @returns {Promise<Object>} Promise of created board
 */
const createBoard = async ({ title, columns }: IBoard): Promise<IBoard | undefined> => {
  await boardDB.push(new Board({ title, columns }));
  return boardDB[boardDB.length - 1];
};

/**
 * Finds board by id and updates it with new info
 * Returns updated board
 * @param {string} id Board's id
 * @param {Object} newBoardInfo Board's new info
 * @returns {Promise<Object>} Promise of updated board
 */
const updateBoard = async (id: string, newBoardInfo: CreatedBoard): Promise<IBoard | undefined> => {
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
 * @returns {Promise<void>} Promise of void
 */
const deleteBoard = async (id: string): Promise<void> => {
  boardDB = await boardDB.filter((board) => board.id !== id);
};

export default { getAll, getOne, createBoard, updateBoard, deleteBoard };
