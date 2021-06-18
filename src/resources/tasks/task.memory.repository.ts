/** @module TaskRepository */
import { getRepository } from "typeorm";
import { Task } from '../../entity/Task';

const getAll = async (): Promise<Array<Task> | []> => {
  const taskRepository = getRepository(Task);
  const allTasks = await taskRepository.find();
  return allTasks;
};

const getOne = async (id: string): Promise<Task | undefined> => {
  const taskRepository = getRepository(Task);
  const task = await taskRepository.findOne(id);
  return task;
};

const createTask = async ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}: Task): Promise<Task | undefined> => {
  const taskRepository = getRepository(Task);
  const task = new Task();
  task.title = title;
  task.order = order;
  task.description = description;
  task.userId = userId;
  task.boardId = boardId;
  task.columnId = columnId;
  await taskRepository.save(task);
  return task;
};

const updateTask = async (id: string, newTaskInfo: Task): Promise<Task | undefined> => {
  const taskRepository = getRepository(Task);
  const taskToUpdate = await taskRepository.findOne(id);
  if (taskToUpdate) {
    const updatedTask = {
      ...taskToUpdate,
      ...newTaskInfo,
    };
    await taskRepository.save(updatedTask);
    return updatedTask;
  }
  return undefined;
};

const deleteTask = async (id: string): Promise<void> => {
  const taskRepository = getRepository(Task);
  const taskToRemove = await taskRepository.findOne(id);
  if (taskToRemove) await taskRepository.remove(taskToRemove);
};

const deleteTasksByBoardId = async (boardId: string): Promise<void> => {
  const taskRepository = getRepository(Task);
  const tasksToRemove = await taskRepository.find({ where: { boardId } });
  if (tasksToRemove) {
    tasksToRemove.forEach(async task => {
      await taskRepository.remove(task);
    })
  }
};

const setUserIdToNull = async (userId: string): Promise<void> => {
  const taskRepository = getRepository(Task);
  const tasks = await taskRepository.find({
    where: 
    { userId }
  });
  if (tasks) {
    const updatedTasks = tasks.map(task => ({...task, userId: null}));
    updatedTasks.forEach(async taskToSave => {
      // @ts-ignore
      await taskRepository.save(taskToSave);
    });
  }
};

export default {
  getAll,
  getOne,
  createTask,
  updateTask,
  deleteTask,
  deleteTasksByBoardId,
  setUserIdToNull,
};
