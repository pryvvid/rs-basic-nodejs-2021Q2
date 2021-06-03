import { Request, Router } from 'express';
import { Task } from './task.model';
import tasksService from './task.service';

interface RequestParams {
  boardId: string;
}

const router = Router({ mergeParams: true });

router
  .route('/')

  .get(async (_req, res) => {
    const tasks = await tasksService.getAll();
    res.json(tasks.map(Task.toResponse));
  })

  .post(async (req: Request<RequestParams>, res) => {
    const { boardId } = req.params;
    const { title, order, description, userId, columnId } = req.body;
    const newTask = await tasksService.createTask({
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    });
    res.status(201).json(newTask);
  });

router
  .route('/:id')

  .get(async (req, res) => {
    const { id } = req.params;
    const task = await tasksService.getOne(id);
    if (!task) {
      res.status(404).json({ error: 'Not found' });
    }
    res.status(200).json(task);
  })

  .put(async (req, res) => {
    const { id } = req.params;
    const { title, order, description, userId, boardId, columnId } = req.body;
    const updatedTask = {
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    };
    const taskAfterUpdate = await tasksService.updateTask(id, updatedTask);
    res.status(200).json(taskAfterUpdate);
  })

  .delete(async (req, res) => {
    const { id } = req.params;
    await tasksService.deleteTask(id);
    res.status(204).json({ message: 'Task was deleted' });
  });

export { router };
