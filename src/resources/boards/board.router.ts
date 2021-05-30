import { Router } from 'express';
import boardsService from './board.service';
import { Board } from './board.model';

const router = Router();

router
  .route('/')

  .get(async (_req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
  })

  .post(async (req, res) => {
    const { title, columns } = req.body;
    const newBoard = await boardsService.createBoard({ title, columns });
    res.status(201).json(newBoard);
  });

router
  .route('/:id')

  .get(async (req, res) => {
    const { id } = req.params;
    const board = await boardsService.getOne(id);
    if (!board) {
      res.status(404).json({ error: 'Not found' });
    }
    res.status(200).json(board);
  })

  .put(async (req, res) => {
    const { id } = req.params;
    const { title, columns } = req.body;
    const updatedBoard = {
      title,
      columns,
    };
    const boardAfterUpdate = await boardsService.updateBoard(id, updatedBoard);
    res.status(200).json(boardAfterUpdate);
  })

  .delete(async (req, res) => {
    const { id } = req.params;
    await boardsService.deleteBoard(id);
    res.status(204).json({ message: 'Board was deleted' });
  });

export { router };
