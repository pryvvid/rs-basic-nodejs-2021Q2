import { Router } from 'express';
import { IUser, User } from './user.model';
import usersService from './user.service';
import { ApiError } from '../../error/ApiError'

const router = Router()

router
  .route('/')

  .get(async (_req, res, next) => {
    try {
      const users = await usersService.getAll();
      // map user fields to exclude secret fields like "password"
      res.json(users.map(User.toResponse));
    } catch(e) {
      next(e)
    }
  })

  .post(async (req, res, next) => {
    try {
      let newUser = undefined;
      const { name, login, password } = req.body;
      if (!name || !login || !password) {
        next(ApiError.badRequest('Body must contain "name", "login", "password" fields'));
        return
      }
      newUser = await usersService.createUser({ name, login, password });
      res.status(201).json(User.toResponse(newUser as IUser));
    } catch(e) {
      next(e)
      return
    }
  });

router
  .route('/:id')

  .get(async (req, res, next) => {
    try {
      let user = undefined
      const { id } = req.params;
      user = await usersService.getOne(id);
      if (!user) {
        next(ApiError.notFound('User is not found'))
        return;
      }
      res.status(200).json(User.toResponse(user as IUser));
    } catch(e) {
      next(e)
    }
  })

  .put(async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, login, password } = req.body;
      const updatedUser = {
        name,
        login,
        password,
      };
      if (!name || !login || !password) {
        next(ApiError.badRequest('Body must contain "name", "login", "password" fields'));
        return
      }
      const userAfterUpdate = await usersService.updateUser(id, updatedUser);
      res.status(200).json(userAfterUpdate);
    } catch(e) {
      next(e)
    }
    
  })

  .delete(async (req, res, next) => {
    try {
      const { id } = req.params;
      await usersService.deleteUser(id);
      res.status(204).json({ message: 'User was deleted' });
    } catch(e) {
      next(e)
    }
  });

export { router };
