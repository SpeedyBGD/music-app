import express from 'express';
import {
  login,
  register,
  logout,
  checkAuth,
} from '@server/controllers/authController';
import { authMiddleware } from '@server/middleware/authMiddleware';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', authMiddleware(true), logout);
router.get('/check', authMiddleware(true), checkAuth);

export default router;
