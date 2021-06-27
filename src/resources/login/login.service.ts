import usersRepo from '../users/user.memory.repository';
import { JwtToken } from "../../common/types";

const authorizeUser = async (login: string, password: string): Promise<JwtToken|undefined> => {
  const token = await usersRepo.authorizeUser(login, password);
  return token;
}

export default { authorizeUser }