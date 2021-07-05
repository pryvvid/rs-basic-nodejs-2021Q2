import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import userRepository from '../resources/users/user.memory.repository';

const createAdmin = async () => {
  const userRepo = getRepository(User);
  let admin = await userRepo.findOne({where:{login: 'admin'}})
  if (!admin) {
    admin = {
      name: 'admin',
      login: 'admin',
      password: 'admin'
    }
    await userRepository.createUser(admin)
  }
}

export { createAdmin }
