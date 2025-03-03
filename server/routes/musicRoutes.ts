import express from 'express';
import {
  fetchCategories,
  getFilteredSongs,
  getLikedSongs,
  likeSong,
  unlikeSong,
  searchSongsController,
  addSong,
} from '@server/controllers/musicController';
import { authenticate } from '@server/middleware/authMiddleware';
import { rateLimiter } from '@server/middleware/rateLimitMiddleware';

const router = express.Router();

router.get('/', authenticate, getFilteredSongs);
router.get('/categories', fetchCategories);
router.post('/like', rateLimiter, authenticate, likeSong);
router.post('/unlike', rateLimiter, authenticate, unlikeSong);
router.get('/liked', authenticate, getLikedSongs);
router.get('/search', authenticate, searchSongsController);
router.post('/add', rateLimiter, authenticate, addSong);

export default router;
