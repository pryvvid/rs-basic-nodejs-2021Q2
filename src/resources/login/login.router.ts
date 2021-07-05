import { Router } from 'express';
import loginService from './login.service';
import { ApiError } from '../../error/ApiError';

const router = Router();

router
.route('/')
.post(async(req, res, next) => {
  try {
    const { login, password } = req.body;
    const token = await loginService.authorizeUser(login, password);
    if (!token) {
      next(ApiError.forbidden('Forbidden'));
      return
    }
    res.status(200).json(token);
  } catch(e) {
    next(e)
  }
})

export { router };