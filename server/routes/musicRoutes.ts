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

const router = express.Router();

router.get('/', authenticate, getFilteredSongs);
router.get('/categories', fetchCategories);
router.post('/like', authenticate, likeSong);
router.post('/unlike', authenticate, unlikeSong);
router.get('/liked', authenticate, getLikedSongs);
router.get('/search', authenticate, searchSongsController);
router.post('/add', authenticate, addSong);

export default router;
