/** @module UserRepository */
import { getRepository } from "typeorm";
import { User } from "../../entity/User";
import { UserDTO } from "../../common/types";

// let userDB: Array<User>|[] = [];

const getAll = async (): Promise<Array<User> | []> => {
  const userRepository = getRepository(User);
  const allUsers = await userRepository.find()
  return allUsers;
};

// const getAll = async (): Promise<Array<User> | []> => {
//   const DB = await userDB;
//   return DB;
// };

const getOne = async (id: string): Promise<User | undefined> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(id)
  return user;
};

// const getOne = async (id: string): Promise<User | null | undefined> => {
//   let user;
//   try {
//     user = await userDB.find((u) => u.id === id);
//   } catch (e) {
//     process.stderr.write(e);
//   }
//   return user;
// };

const createUser = async ({ name, login, password }: UserDTO): Promise<User|undefined> => {
  const userRepository = getRepository(User);
  const user = new User();
  user.name = name;
  user.login = login;
  user.password = password;
  await userRepository.save(user);
  // const createdUser = await userRepository.findOne(user.id)
  return user;
};

// const createUser = async ({ name, login, password }: UserDTO): Promise<User|undefined> => {
//   const newUser = new User({ name, login, password })
//   userDB = await [...userDB, newUser];
//   return userDB[userDB.length - 1];
// };

const updateUser = async (id: string, newUserInfo: UserDTO): Promise<User|undefined> => {
  const userRepository = getRepository(User);
  const userToUpdate = await userRepository.findOne(id);
  if (userToUpdate) {
    const updatedUser = { ...userToUpdate, ...newUserInfo }
    await userRepository.save(updatedUser);
    return updatedUser;
  }
  return undefined;
};

// const updateUser = async (id: string, newUserInfo: object): Promise<User|undefined> => {
//   const userToUpdate = await userDB.find((user) => user.id === id);
//   const updatedUser = {
//     ...userToUpdate,
//     ...newUserInfo,
//   };
//   userDB = userDB.filter((user) => user.id !== id);
//   userDB = [...userDB, updatedUser as IUser];
//   return updatedUser as IUser;
// };

const deleteUser = async (id: string | undefined): Promise<void> => {
  const userRepository = getRepository(User);
  const userToRemove = await userRepository.findOne(id);
  if (userToRemove) {
    await userRepository.remove(userToRemove)
  }
};

// const deleteUser = async (id: string | undefined): Promise<void> => {
//   userDB = await userDB.filter((user) => user.id !== id);
// };

export default { getAll, getOne, createUser, updateUser, deleteUser };
