import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '@server/models/User';
import db from '@server/utils/db';
import { getJwtSecret } from '@server/utils/jwtUtils';
import { checkTokenBlacklist } from '@server/services/authService';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.locals.user = null;
    return next();
  }

  try {
    const JWT_SECRET = getJwtSecret();

    if (checkTokenBlacklist(token)) {
      return res.status(401).json({ message: 'Token je poništen' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as User;

    const user = db
      .prepare('SELECT * FROM korisnici WHERE id = ?')
      .get(decoded.id) as User | undefined;

    if (!user) {
      return res.status(401).json({ message: 'Korisnik više ne postoji' });
    }

    res.locals.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Nevalidan ili istekao token',
      error: error instanceof Error ? error.message : 'Nepoznata greška',
    });
  }
};
