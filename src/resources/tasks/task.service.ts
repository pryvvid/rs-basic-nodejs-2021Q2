/** @module TaskService */
import tasksRepo from './task.memory.repository';
import { ITask } from './task.model';

/**
 * Returns a promise contains all tasks
 * @returns {Promise<Array<Object>>} Promise of array contains all tasks
 */
const getAll = async (): Promise<Array<ITask>|[]> => tasksRepo.getAll();

/**
 * Returns a promise contains task found by id or null
 * @param {string} id Task's id
 * @returns {Promise<Object|null>} Promise of task object or null
 */
const getOne = async (id: string): Promise<ITask | null | undefined> => tasksRepo.getOne(id);

/**
 * Returns a promise contains created task
 * @param {Object} task Task object
 * @returns {Promise<Object>} Promise of created task
 */
const createTask = async (task: ITask): Promise<ITask | undefined> => tasksRepo.createTask(task);

/**
 * Returns a promise contains updated task
 * @param {string} id Task's id
 * @param {Object} updatedInfo Task's new info
 * @returns {Promise<Object>} Promise of updated task
 */
const updateTask = async (id: string, updatedInfo: ITask): Promise<ITask | undefined> => tasksRepo.updateTask(id, updatedInfo);

/**
 * Returns a promise that deletes a task
 * @param {string} id Task's id
 * @returns {Promise<void>} Promise of void
 */
const deleteTask = async (id: string): Promise<void> => tasksRepo.deleteTask(id);

export default { getAll, getOne, createTask, updateTask, deleteTask };
