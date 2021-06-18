/** @module TaskService */
import tasksRepo from './task.memory.repository';
import { Task } from '../../entity/Task';

const getAll = async (): Promise<Array<Task>|[]> => tasksRepo.getAll();

const getOne = async (id: string): Promise<Task | undefined> => tasksRepo.getOne(id);

const createTask = async (task: Task): Promise<Task | undefined> => tasksRepo.createTask(task);

const updateTask = async (id: string, updatedInfo: Task): Promise<Task | undefined> => tasksRepo.updateTask(id, updatedInfo);

const deleteTask = async (id: string): Promise<void> => tasksRepo.deleteTask(id);

export default { getAll, getOne, createTask, updateTask, deleteTask };
