import { Router } from 'express';
import { IUser, User } from './user.model';
import usersService from './user.service';

const router = Router()

router
  .route('/')

  .get(async (_req, res) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  })

  .post(async (req, res) => {
    const { name, login, password } = req.body;
    const newUser = await usersService.createUser({ name, login, password });
    res.status(201).json(User.toResponse(newUser as IUser));
  });

router
  .route('/:id')

  .get(async (req, res) => {
    // const { id } = req.params;
    const {id} = req.params;
    const user = await usersService.getOne(id);
    if (!user) {
      res.status(404).json({ error: 'Not found' });
    }
    res.status(200).json(User.toResponse(user as IUser));
  })

  .put(async (req, res) => {
    const { id } = req.params;
    const { name, login, password } = req.body;
    const updatedUser = {
      name,
      login,
      password,
    };
    const userAfterUpdate = await usersService.updateUser(id, updatedUser);
    res.status(200).json(userAfterUpdate);
  })

  .delete(async (req, res) => {
    const { id } = req.params;
    await usersService.deleteUser(id);
    res.status(204).json({ message: 'User was deleted' });
  });

export { router };
