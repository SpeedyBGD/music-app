import express from 'express';
import {
  login,
  register,
  logout,
  checkAuth,
} from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', authMiddleware(true), logout);
router.get('/check', authMiddleware(true), checkAuth);

export default router;
