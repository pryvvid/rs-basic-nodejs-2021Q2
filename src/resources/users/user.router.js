const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getOne(id);    
  res.status(200).json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;
  const newUser = new User({name, login, password})
  await usersService.createUser(newUser)
  res.status(201).json(User.toResponse(newUser))
})

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { name, login, password } = req.body;
  const updatedUser = {
    name, login, password
  }
  await usersService.updateUser(id, updatedUser);
  res.status(200).json(updatedUser);
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  await usersService.deleteUser(id);
  res.status(204).json({ message: 'user deleted' });
});

module.exports = router;
