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
import { authMiddleware } from '@server/middleware/authMiddleware';
import { rateLimiter } from '@server/middleware/rateLimitMiddleware';

const router = express.Router();

router.get('/', authMiddleware(false), getFilteredSongs);
router.get('/categories', fetchCategories);
router.post('/like', rateLimiter, authMiddleware(true), likeSong);
router.post('/unlike', rateLimiter, authMiddleware(true), unlikeSong);
router.get('/liked', authMiddleware(true), getLikedSongs);
router.get('/search', authMiddleware(false), searchSongsController);
router.post('/add', rateLimiter, authMiddleware(true), addSong);

export default router;
