import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import db from '@server/utils/db';
import { getJwtSecret } from '@server/utils/jwtUtils';
import User from '@server/models/User';

export const authMiddleware = (requireAuth: boolean = false) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    const JWT_SECRET = getJwtSecret();

    if (!accessToken && !refreshToken) {
      if (requireAuth)
        return res.status(401).json({ message: 'Neautorizovan pristup' });
      res.locals.user = null;
      return next();
    }

    try {
      if (accessToken) {
        const decoded = jwt.verify(accessToken, JWT_SECRET) as {
          id: number;
          email: string;
        };
        const user = db
          .prepare('SELECT id, email FROM korisnici WHERE id = ?')
          .get(decoded.id) as User;
        if (user) {
          res.locals.user = user;
          return next();
        }
      }

      if (refreshToken) {
        const decoded = jwt.verify(refreshToken, JWT_SECRET) as {
          id: number;
          email: string;
        };
        const user = db
          .prepare(
            'SELECT id, email FROM korisnici WHERE id = ? AND refreshToken = ?'
          )
          .get(decoded.id, refreshToken) as User;
        if (!user) throw new Error('Invalid refresh token');

        const newAccessToken = jwt.sign(
          { id: user.id, email: user.email },
          JWT_SECRET,
          { expiresIn: '15m' }
        );
        res.cookie('accessToken', newAccessToken, {
          httpOnly: true,
          secure: false,
          maxAge: 15 * 60 * 1000,
        });
        res.locals.user = user;
        return next();
      }

      if (requireAuth)
        return res.status(401).json({ message: 'Neautorizovan pristup' });
      res.locals.user = null;
      return next();
    } catch (error) {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      if (requireAuth)
        return res.status(401).json({ message: 'Nevalidan ili istekao token' });
      res.locals.user = null;
      return next();
    }
  };
};
