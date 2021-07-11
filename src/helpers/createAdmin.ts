import { CreateUserDto } from '../resources/users/dto/create-user.dto';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

const createAdmin = async () => {
  const userRepo = getRepository(User);
  let admin: CreateUserDto = await userRepo.findOne({
    where: { login: 'admin' },
  });
  if (!admin) {
    admin = new User();
    admin.name = 'admin';
    admin.login = 'admin';
    admin.password = 'admin';
    await userRepo.save(admin);
  }
};

export { createAdmin };
