import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../utils/db.js';
import { getJwtSecret } from '../utils/jwtUtils.js';
import User from '../models/User.js';

interface AuthResponse {
  error?: boolean;
  accessToken?: string;
  refreshToken?: string;
  status?: number;
  message?: string;
}

export const loginService = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const user = db
    .prepare('SELECT * FROM korisnici WHERE email = ?')
    .get(email) as User;
  if (!user)
    return { error: true, status: 401, message: 'Korisnik ne postoji' };

  const isMatch = await bcrypt.compare(password, user.lozinka);
  if (!isMatch)
    return { error: true, status: 401, message: 'Pogrešna lozinka' };

  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    getJwtSecret(),
    { expiresIn: '15m' }
  );
  const refreshToken = jwt.sign(
    { id: user.id, email: user.email },
    getJwtSecret(),
    { expiresIn: '7d' }
  );
  db.prepare('UPDATE korisnici SET refreshToken = ? WHERE id = ?').run(
    refreshToken,
    user.id
  );

  return { accessToken, refreshToken };
};

export const registerService = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const existingUser = db
    .prepare('SELECT * FROM korisnici WHERE email = ?')
    .get(email) as User;
  if (existingUser)
    return { error: true, status: 400, message: 'Ovaj email već postoji' };

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = db
    .prepare('INSERT INTO korisnici (email, lozinka) VALUES (?, ?)')
    .run(email, hashedPassword);

  const accessToken = jwt.sign(
    { id: result.lastInsertRowid, email },
    getJwtSecret(),
    { expiresIn: '15m' }
  );
  const refreshToken = jwt.sign(
    { id: result.lastInsertRowid, email },
    getJwtSecret(),
    { expiresIn: '7d' }
  );
  db.prepare('UPDATE korisnici SET refreshToken = ? WHERE id = ?').run(
    refreshToken,
    result.lastInsertRowid
  );

  return { accessToken, refreshToken };
};

export const logoutService = async (
  refreshToken: string
): Promise<AuthResponse> => {
  const decoded = jwt.verify(refreshToken, getJwtSecret()) as {
    id: number;
    email: string;
  };
  const user = db
    .prepare('SELECT id FROM korisnici WHERE id = ? AND refreshToken = ?')
    .get(decoded.id, refreshToken) as User;
  if (!user)
    return { error: true, status: 401, message: 'Nevalidan refresh token' };

  db.prepare('UPDATE korisnici SET refreshToken = NULL WHERE id = ?').run(
    user.id
  );
  return { message: 'Uspešno ste se odjavili' };
};
