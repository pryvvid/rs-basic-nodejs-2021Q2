const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')

  .get(async (req, res) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  })

  .post(async (req, res) => {
    const { name, login, password } = req.body;
    const newUser = new User({ name, login, password });
    await usersService.createUser(newUser);
    res.status(201).json(User.toResponse(newUser));
  });

router
  .route('/:id')

  .get(async (req, res) => {
    const { id } = req.params;
    const user = await usersService.getOne(id);
    if (!user) {
      res.status(404).json({ error: 'Not found' });
    }
    res.status(200).json(User.toResponse(user));
  })

  .put(async (req, res) => {
    const { id } = req.params;
    const { name, login, password } = req.body;
    const updatedUser = {
      name,
      login,
      password,
    };
    await usersService.updateUser(id, updatedUser);
    res.status(200).json(updatedUser);
  })

  .delete(async (req, res) => {
    const { id } = req.params;
    await usersService.deleteUser(id);
    res.status(204).json({ message: 'User was deleted' });
  });

module.exports = router;
