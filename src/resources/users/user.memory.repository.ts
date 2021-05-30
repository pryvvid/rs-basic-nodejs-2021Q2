/** @module UserRepository */
import { User, IUser } from './user.model';

let userDB: Array<IUser>|[] = [];

/**
 * Returns all users from database
 * @returns {Promise<Array<Object>|[]>} Promise of array contains all users
 */
const getAll = async (): Promise<Array<IUser> | []> => {
  const DB = await userDB;
  return DB;
};

/**
 * Finds user by id and returns it
 * @param {string} id user's id
 * @returns {Promise<Object|null|undefined>} Promise of user object or null
 */
const getOne = async (id: string): Promise<IUser | null | undefined> => {
  let user = null;
  try {
    user = await userDB.find((u) => u.id === id);
  } catch (e) {
    process.stderr.write(e);
  }
  return user;
};

type createdUser = {
  name: string,
  login: string,
  password: string
}

/**
 * Creates new user from object
 * Adds it to database
 * Returns created user
 * @param {Object} user Object with properties 'id, name, login, password'
 * @param {string} user.id User's id
 * @param {string} user.name User's name
 * @param {string} user.password User's password
 * @returns {Promise<Object>} Promise of created user
 */
const createUser = async ({ name, login, password }: createdUser): Promise<IUser|undefined> => {
  const newUser = new User({ name, login, password })
  userDB = await [...userDB, newUser];
  return userDB[userDB.length - 1];
};

/**
 * Finds user by id and updates it with new info
 * Returns updated user
 * @param {string} id User's id
 * @param {Object} newUserInfo User's new info
 * @returns {Promise<Object>} Promise of updated user
 */
// const updateUser = async (id: string, newUserInfo: object): Promise<IUser|undefined> => {
//   const userIndex = await userDB.findIndex((user) => user.id === id);
//   const updatedUser: IUser = {
//     ...userDB[userIndex],
//     ...newUserInfo,
//   };
//   userDB[userIndex] = updatedUser;
//   return updatedUser;
// };

const updateUser = async (id: string, newUserInfo: object): Promise<IUser|undefined> => {
  const userToUpdate = await userDB.find((user) => user.id === id);
  const updatedUser = {
    ...userToUpdate,
    ...newUserInfo,
  };
  userDB = userDB.filter((user) => user.id !== id);
  userDB = [...userDB, updatedUser as IUser];
  return updatedUser as IUser;
};

/**
 * Deletes user from database
 * @param {string} id user's id
 * @returns {Promise<void>} Promise of void
 */
const deleteUser = async (id: string | undefined): Promise<void> => {
  userDB = await userDB.filter((user) => user.id !== id);
};

export default { getAll, getOne, createUser, updateUser, deleteUser };
