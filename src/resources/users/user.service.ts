/** @module UserService */
import usersRepo from './user.memory.repository';
import taskRepo from '../tasks/task.memory.repository';
import { User } from "../../entity/User";
import { UserDTO } from "../../common/types";

const getAll = async (): Promise<Array<User>> => usersRepo.getAll();

const getOne = async (id: string): Promise<User | undefined> => usersRepo.getOne(id);

const createUser = async (user: UserDTO): Promise<User | undefined> => usersRepo.createUser(user);

const updateUser = async (id: string, updatedInfo: UserDTO): Promise<User | undefined> => usersRepo.updateUser(id, updatedInfo);

const deleteUser = async (id: string): Promise<void> => {
  await taskRepo.setUserIdToNull(id);
  await usersRepo.deleteUser(id);
};

export default { getAll, getOne, createUser, updateUser, deleteUser };
