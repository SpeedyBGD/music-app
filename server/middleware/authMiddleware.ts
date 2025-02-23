import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '@server/models/User';
import db from '@server/utils/db';
import { getJwtSecret } from '@server/utils/jwtUtils';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const JWT_SECRET = getJwtSecret();
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Nema tokena' });
    }

    if (checkTokenBlacklist(token)) {
      return res.status(401).json({ message: 'Token je poništen' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as User;
    res.locals.user = decoded;

    const user = db
      .prepare('SELECT * FROM korisnici WHERE id = ?')
      .get(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Korisnik više ne postoji' });
    }

    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res
        .status(401)
        .json({ message: 'Nevalidan ili istekao token', error: error.message });
    }
    return res.status(401).json({ message: 'Nepoznata greška' });
  }
};

export const checkTokenBlacklist = (token: string): boolean => {
  const blacklistedToken = db
    .prepare(
      `
      SELECT token_blacklisted_at 
      FROM korisnici 
      WHERE jwt_token = ? 
      AND token_blacklisted_at IS NOT NULL
      AND DATETIME(token_blacklisted_at, '+1 hour') > DATETIME('now')
    `
    )
    .get(token);

  return !!blacklistedToken;
};
