import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '@server/models/User';
import db from '@server/utils/db';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    return res
      .status(500)
      .json({
        message: 'Potrebno je postaviti JWT_SECRET u environment varijablama',
      });
  }

  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Nema tokena' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as User;
    res.locals.user = decoded;

    const user = db
      .prepare('SELECT * FROM korisnici WHERE id = ?')
      .get(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Korisnik više ne postoji' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Nevalidan ili istekao token' });
  }
};
