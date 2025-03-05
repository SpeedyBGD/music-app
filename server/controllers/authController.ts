import { Request, Response } from 'express';
import {
  loginService,
  registerService,
  logoutService,
} from '@server/services/authService';
import User from '@server/models/User';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email i lozinka su obavezni' });

  const result = await loginService(email, password);
  if (result.error)
    return res.status(result.status!).json({ message: result.message });

  res.cookie('accessToken', result.accessToken, {
    httpOnly: true,
    secure: false,
    maxAge: 15 * 60 * 1000,
  });
  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({ message: 'Uspešna prijava' });
};

export const register = async (req: Request, res: Response) => {
  const { email, password, confirmPassword } = req.body;
  if (!email || !password || !confirmPassword)
    return res.status(400).json({ message: 'Sva polja su obavezna' });
  if (password !== confirmPassword)
    return res.status(400).json({ message: 'Lozinke se ne podudaraju' });

  const result = await registerService(email, password);
  if (result.error)
    return res.status(result.status!).json({ message: result.message });

  res.cookie('accessToken', result.accessToken, {
    httpOnly: true,
    secure: false,
    maxAge: 15 * 60 * 1000,
  });
  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(201).json({ message: 'Uspešna registracija' });
};

export const logout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(400).json({ message: 'Refresh token nije dostupan' });

  const result = await logoutService(refreshToken);
  if (result.error)
    return res.status(result.status!).json({ message: result.message });

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: 'Uspešno ste se odjavili' });
};

export const checkAuth = (req: Request, res: Response) => {
  const user = res.locals.user as User;
  res.json({ email: user.email });
};
