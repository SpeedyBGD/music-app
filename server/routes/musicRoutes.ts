import express from 'express';
import {
  fetchCategories,
  getFilteredSongs,
  likeSong,
} from '@server/controllers/musicController';
import { authenticate } from '@server/middleware/authMiddleware'; 

const router = express.Router();

router.get('/', getFilteredSongs);
router.get('/categories', fetchCategories);
router.post('/like', authenticate, likeSong);

export default router;
