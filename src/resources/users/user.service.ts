/** @module UserService */
import usersRepo from './user.memory.repository';
import taskRepo from '../tasks/task.memory.repository';
import { IUser } from './user.model';

/**
 * Returns a promise of array contains all users
 * @returns {Promise<Array<object>>} Promise of array contains all users
 */
const getAll = async (): Promise<Array<IUser>> => usersRepo.getAll();

/**
 * Returns a promise that contains user found by id or null
 * @param {string} id User's id
 * @returns {Promise<Object|null>} Promise of user object or null
 */
const getOne = async (id: string): Promise<IUser | undefined | null> => usersRepo.getOne(id);

/**
 * Returns a promise contains created user
 * @param {Object} user User object
 * @returns {Promise<Object>} Promise of created user
 */
const createUser = async (user: IUser): Promise<IUser | undefined> => usersRepo.createUser(user);

/**
 * Returns a promise of updated user
 * @param {string} id User's id
 * @param {Object} updatedInfo User's new info
 * @returns {Promise<Object>} Promise of updated user
 */
const updateUser = async (id: string, updatedInfo: IUser): Promise<IUser | undefined> => usersRepo.updateUser(id, updatedInfo);

/**
 * Calls two async functions
 * First sets 'user_id' property of Task object to null
 * Second deletes user from database
 * @param {string} id User's id
 * @returns {Promise<void>} Promise of void
 */
const deleteUser = async (id: string): Promise<void> => {
  await taskRepo.setUserIdToNull(id);
  await usersRepo.deleteUser(id);
};

export default { getAll, getOne, createUser, updateUser, deleteUser };
