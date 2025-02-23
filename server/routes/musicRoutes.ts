import express from 'express';
import {
  fetchCategories,
  getFilteredSongs,
} from '@server/controllers/musicController';

const router = express.Router();

router.get('/', getFilteredSongs);
router.get('/categories', fetchCategories);

export default router;
