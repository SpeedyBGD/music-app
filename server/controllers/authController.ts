import { Request, Response } from 'express';
import {
  loginService,
  registerService,
  logoutService,
} from '@server/services/authService';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await loginService(email, password);

  if (result.error) {
    return res.status(result.status!).json({ message: result.message });
  }
  return res.json({ token: result.token });
};

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await registerService(email, password);

  if (result.error) {
    return res.status(result.status!).json({ message: result.message });
  }
  return res.status(201).json({ token: result.token });
};

export const logout = (req: Request, res: Response) => {
  const token = req.headers['authorization']?.split(' ')[1];
  const userId = res.locals.user.id;

  if (!token) {
    return res.status(400).json({ message: 'Token nije dostupan' });
  }

  const result = logoutService(token, userId);

  if (result.error) {
    return res.status(result.status!).json({ message: result.message });
  }
  return res.status(200).json({ message: result.message });
};
