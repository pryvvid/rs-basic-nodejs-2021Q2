/** @module BoardService */
import boardsRepo from './board.memory.repository';
import { Board } from "../../entity/Board";
import { BoardDTO } from "../../common/types";
import taskRepo from '../tasks/task.memory.repository';

const getAll = async (): Promise<Array<Board>> => boardsRepo.getAll();

const getOne = async (id: string): Promise<Board | undefined> => boardsRepo.getOne(id);

const createBoard = async (board: BoardDTO): Promise<Board | undefined> => boardsRepo.createBoard(board);

const updateBoard = async (id: string, updatedInfo: BoardDTO): Promise<Board | undefined> => boardsRepo.updateBoard(id, updatedInfo);

const deleteBoard = async (id: string): Promise<void> => {
  await taskRepo.deleteTasksByBoardId(id)
  await boardsRepo.deleteBoard(id);
}

export default { getAll, getOne, createBoard, updateBoard, deleteBoard };
