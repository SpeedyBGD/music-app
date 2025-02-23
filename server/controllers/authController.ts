import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '@server/models/User';
import db from '@server/utils/db';

export const login = async (req: Request, res: Response) => {
  const JWT_SECRET = process.env.JWT_SECRET; // Scoped inside the function
  console.log(JWT_SECRET); // Log to verify if it's being loaded

  if (!JWT_SECRET) {
    return res.status(500).json({ message: 'JWT_SECRET environment variable is required but not set' });
  }

  const { email, password } = req.body;

  try {
    const user: User | undefined = db
      .prepare('SELECT * FROM korisnici WHERE email = ?')
      .get(email) as User | undefined;

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.lozinka);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const register = async (req: Request, res: Response) => {
  const JWT_SECRET = process.env.JWT_SECRET; // Scoped inside the function
  console.log(JWT_SECRET); // Log to verify if it's being loaded

  if (!JWT_SECRET) {
    return res.status(500).json({ message: 'JWT_SECRET environment variable is required but not set' });
  }

  const { email, password } = req.body;

  try {
    const existingUser: User | undefined = db
      .prepare('SELECT * FROM korisnici WHERE email = ?')
      .get(email) as User | undefined;

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = db
      .prepare('INSERT INTO korisnici (email, lozinka) VALUES (?, ?)')
      .run(email, hashedPassword);

    const newUser = {
      id: result.lastInsertRowid,
      email,
      lozinka: hashedPassword,
    };

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
};
