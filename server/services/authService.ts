import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '@server/models/User';
import db from '@server/utils/db';
import { getJwtSecret } from '@server/utils/jwtUtils';

interface AuthResponse {
  error?: boolean;
  token?: string;
  status?: number;
  message?: string;
}

export const loginService = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const user = db
    .prepare('SELECT * FROM korisnici WHERE email = ?')
    .get(email) as User | undefined;

  if (!user) {
    return { error: true, status: 401, message: 'Korisnik ne postoji' };
  }

  const isMatch = await bcrypt.compare(password, user.lozinka);
  if (!isMatch) {
    return { error: true, status: 401, message: 'Pogrešna lozinka' };
  }

  const token = generateToken(user);
  return { token };
};

export const registerService = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const existingUser = db
    .prepare('SELECT * FROM korisnici WHERE email = ?')
    .get(email) as User | undefined;

  if (existingUser) {
    return { status: 400, message: 'Ovaj email već postoji' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = db
    .prepare('INSERT INTO korisnici (email, lozinka) VALUES (?, ?)')
    .run(email, hashedPassword);

  const newUser: User = {
    id: result.lastInsertRowid as number,
    email,
    lozinka: hashedPassword,
  };

  const token = generateToken(newUser);
  return { token };
};

export const logoutService = (token: string, userId: number): AuthResponse => {
  try {
    const JWT_SECRET = getJwtSecret();
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };

    if (decoded.id !== userId) {
      return {
        status: 401,
        message: 'Token ne pripada ovom korisniku',
      };
    }

    db.prepare(
      `
      UPDATE korisnici 
      SET jwtToken = ?, 
          tokenBlacklistedAt = DATETIME('now')
      WHERE id = ?
    `
    ).run(token, userId);

    return { message: 'Uspešno ste se odjavili' };
  } catch (error) {
    return {
      status: 401,
      message: 'Nevalidan ili istekao token',
    };
  }
};

const generateToken = (user: User): string => {
  const JWT_SECRET = getJwtSecret();
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '1h',
  });
};

export const checkTokenBlacklist = (token: string): boolean => {
  const blacklistedToken = db
    .prepare(
      `
      SELECT tokenBlacklistedAt 
      FROM korisnici 
      WHERE jwtToken = ? 
      AND tokenBlacklistedAt IS NOT NULL
      AND DATETIME(tokenBlacklistedAt, '+1 hour') > DATETIME('now')
    `
    )
    .get(token);

  return !!blacklistedToken;
};
