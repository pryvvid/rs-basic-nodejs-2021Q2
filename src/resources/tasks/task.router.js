const router = require('express').Router({mergeParams: true});
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll();
  // map task fields to exclude secret fields like "password"
  res.json(tasks.map(Task.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const task = await tasksService.getOne(id);
  if (task === undefined) {
    res.status(404).json({error: "Not found"});
  }     
  res.status(200).json(Task.toResponse(task));
});

router.route('/').post(async (req, res) => {
  const { boardId } = req.params;
  const { 
    title,
    order,
    description,
    userId,
    columnId
  } = req.body;

  const newTask = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  })
  await tasksService.createTask(newTask)
  res.status(201).json(Task.toResponse(newTask))
})

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const {     
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  } = req.body;
  const updatedTask = {
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  }
  await tasksService.updateTask(id, updatedTask);
  res.status(200).json(updatedTask);
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  await tasksService.deleteTask(id);
  res.status(204).send('Deleted');
});

module.exports = router;
