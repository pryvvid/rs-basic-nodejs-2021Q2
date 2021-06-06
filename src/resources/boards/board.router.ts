import { Router } from 'express';
import boardsService from './board.service';
import { Board } from './board.model';
import { ApiError } from '../../error/ApiError';

const router = Router();

router
  .route('/')

  .get(async (_req, res, next) => {
    try {
      const boards = await boardsService.getAll();
      res.json(boards.map(Board.toResponse));
    } catch (e) {
      next(e)
    }
  })

  .post(async (req, res, next) => {
    try {
      const { title, columns } = req.body;
      const newBoard = await boardsService.createBoard({ title, columns });
      res.status(201).json(newBoard);
    } catch (e) {
      next(e)
    }

  });

router
  .route('/:id')

  .get(async (req, res, next) => {
    try {
      const { id } = req.params;
      const board = await boardsService.getOne(id);
      if (!board) {
        next(ApiError.notFound('Board is not found'))
        return;
      }
      res.status(200).json(board);
    } catch (e) {
      next(e)
    }
    
  })

  .put(async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, columns } = req.body;
      const updatedBoard = {
        title,
        columns,
      };
      const boardAfterUpdate = await boardsService.updateBoard(id, updatedBoard);
      res.status(200).json(boardAfterUpdate);
    } catch (e) {
      next(e)
    }
    
  })

  .delete(async (req, res, next) => {
    try {
      const { id } = req.params;
      await boardsService.deleteBoard(id);
      res.status(204).json({ message: 'Board was deleted' });
    } catch (e) {
      next(e)
    }

  });

export { router };
