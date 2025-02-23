import express from 'express';
import {
  fetchCategories,
  getFilteredSongs,
} from '../controllers/musicController';

const router = express.Router();

router.get('/', getFilteredSongs);
router.get('/categories', fetchCategories);

export default router;
