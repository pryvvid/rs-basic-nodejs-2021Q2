/** @module BoardService */
import boardsRepo from './board.memory.repository';
import { IBoard } from './board.model'
import taskRepo from '../tasks/task.memory.repository';


type BoardToUpdate = {
  title: string,
  columns: Array<object>
}
/**
 * Returns a promise contains all boards
 * @returns {Promise<Array<Object>>} Promise of array contains all boards
 */
const getAll = async (): Promise<Array<IBoard>> => boardsRepo.getAll();

/**
 * Returns a promise contains board found by id or null
 * @param {string} id Board's id
 * @returns {Promise<Object|null>} Promise of board object or null
 */
const getOne = async (id: string): Promise<IBoard | null | undefined> => boardsRepo.getOne(id);

/**
 * Returns a promise contains created board
 * @param {Object} task Board object
 * @returns {Promise<Object>} Promise of created board
 */
const createBoard = async (board: IBoard): Promise<IBoard | undefined> => boardsRepo.createBoard(board);

/**
 * Returns a promise contains updated board
 * @param {string} id Board's id
 * @param {Object} updatedInfo Board's new info
 * @returns {Promise<Object>} Promise of updated board
 */
const updateBoard = async (id: string, updatedInfo: BoardToUpdate): Promise<IBoard | undefined> => boardsRepo.updateBoard(id, updatedInfo);

/**
 * Calls two functions
 * First deletes tasks with property of board's id
 * Second deletes board from database
 * @param {string} id User's id
 * @returns {Promise<void>} Promise of void
 */
const deleteBoard = async (id: string): Promise<void> => {
  await taskRepo.deleteTasksByBoardId(id)
  await boardsRepo.deleteBoard(id);
}

export default { getAll, getOne, createBoard, updateBoard, deleteBoard };
