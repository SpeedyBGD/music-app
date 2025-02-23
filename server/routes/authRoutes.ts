import express from 'express';
import { login, register, logout } from '@server/controllers/authController';
import { authenticate } from '@server/middleware/authMiddleware'; // Import middleware

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', authenticate, logout);
export default router;
