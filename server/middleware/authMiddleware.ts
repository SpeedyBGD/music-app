import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '@server/models/User';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const JWT_SECRET = process.env.JWT_SECRET; // Scoped inside the function

  if (!JWT_SECRET) {
    return res.status(500).json({ message: 'JWT_SECRET environment variable is required but not set' });
  }

  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as User;
    res.locals.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
