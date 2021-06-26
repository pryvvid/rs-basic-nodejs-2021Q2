/** @module BoardRepository */
import { getRepository } from "typeorm";
import { Board } from "../../entity/Board";
import { BoardDTO } from "../../common/types"

const getAll = async (): Promise<Array<Board> | []> => {
  const boardRepository = getRepository(Board);
  const allBoards = await boardRepository.find();
  return allBoards;
};

const getOne = async (id: string | undefined): Promise<Board | undefined> => {
  const boardRepository = getRepository(Board);
  const board = await boardRepository.findOne(id);
  return board;
};

const createBoard = async ({ title, columns }: BoardDTO): Promise<Board | undefined> => {
  const boardRepository = getRepository(Board);
  const board = new Board();
  board.title = title;
  board.columns = columns;
  await boardRepository.save(board);
  return board;
};

const updateBoard = async (id: string, newBoardInfo: BoardDTO): Promise<Board | undefined> => {
  const boardRepository = getRepository(Board);
  const boardToUpdate = await boardRepository.findOne(id);
  if (boardToUpdate) {
    const updatedBoard = { ...boardToUpdate,  ...newBoardInfo };
    await boardRepository.save(updatedBoard)
    return updatedBoard;
  }
  return undefined;
};

const deleteBoard = async (id: string): Promise<void> => {
  const boardRepository = getRepository(Board);
  const boardToRemove = await boardRepository.findOne(id);
  if (boardToRemove) await boardRepository.remove(boardToRemove);
};

export default { getAll, getOne, createBoard, updateBoard, deleteBoard };
