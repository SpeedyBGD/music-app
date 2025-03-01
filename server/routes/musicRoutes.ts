import express from 'express';
import {
  fetchCategories,
  getFilteredSongs,
  getLikedSongs,
  likeSong,
  unlikeSong,
} from '@server/controllers/musicController';
import { authenticate } from '@server/middleware/authMiddleware';

const router = express.Router();

router.get('/', authenticate, getFilteredSongs);
router.get('/categories', fetchCategories);
router.post('/like', authenticate, likeSong);
router.post('/unlike', authenticate, unlikeSong);
router.get('/liked', authenticate, getLikedSongs);

export default router;
