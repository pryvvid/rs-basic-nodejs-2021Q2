/** @module UserRepository */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getRepository } from "typeorm";
import { User } from "../../entity/User";
import { UserDTO, JwtToken } from "../../common/types";
import { JWT_SECRET_KEY } from '../../common/config';

const getAll = async (): Promise<Array<User> | []> => {
  const userRepository = getRepository(User);
  const allUsers = await userRepository.find()
  return allUsers;
};

const getOne = async (id: string): Promise<User | undefined> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(id)
  return user;
};

const createUser = async ({ name, login, password }: UserDTO): Promise<User|undefined> => {
  const userRepository = getRepository(User);
  const user = new User();
  user.name = name;
  user.login = login;
  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  await userRepository.save(user);
  return user;
};

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

const deleteUser = async (id: string | undefined): Promise<void> => {
  const userRepository = getRepository(User);
  const userToRemove = await userRepository.findOne(id);
  if (userToRemove) {
    await userRepository.remove(userToRemove)
  }
};

const authorizeUser = async (login: string, password: string): Promise<JwtToken | undefined> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({where: { login }})
  if (user) {
    const hashedPassword = user.password;
    const userId = user.id;
    const isPasswordMatching = await bcrypt.compare(password, hashedPassword);
    if (isPasswordMatching) {
      const token = jwt.sign({ userId, login }, JWT_SECRET_KEY as string, { expiresIn: 60 * 60});
      return { token }
    }
  }
  return undefined;
}

export default { getAll, getOne, createUser, updateUser, deleteUser, authorizeUser };
