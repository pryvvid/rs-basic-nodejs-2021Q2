const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  // map Board fields to exclude secret fields like "password"
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const board = await boardsService.getOne(id);
  if (board === undefined) {
    res.status(404).json({error: "Not found"});
  }    
  res.status(200).json(Board.toResponse(board));
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;
  const newBoard = new Board({ title, columns })
  await boardsService.createBoard(newBoard)
  res.status(201).json(Board.toResponse(newBoard))
})

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { title, columns } = req.body;
  const updatedBoard = {
    title, columns
  }
  await boardsService.updateBoard(id, updatedBoard);
  res.status(200).json(updatedBoard);
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  await boardsService.deleteBoard(id);
  res.status(204).json({ message: 'Board deleted' });
});

module.exports = router;
