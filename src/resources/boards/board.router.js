const router = require('express').Router();
const boardsService = require('./board.service');
const Board = require('./board.model');

router
  .route('/')

  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
  })

  .post(async (req, res) => {
    const { title, columns } = req.body;
    const newBoard = await boardsService.createBoard({ title, columns });
    res.status(201).json(Board.toResponse(newBoard));
  });

router
  .route('/:id')

  .get(async (req, res) => {
    const { id } = req.params;
    const board = await boardsService.getOne(id);
    if (!board) {
      res.status(404).json({ error: 'Not found' });
    }
    res.status(200).json(Board.toResponse(board));
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

module.exports = router;
