import { Request, Response } from 'express';
import {
  likeSongService,
  getCategories,
  getSongsByFilters,
  getLikedSongsByFilter,
} from '@server/services/musicService';
import { SongFilters } from '@server/models/Song';

export const likeSong = (req: Request, res: Response) => {
  const userId = res.locals.user.id;
  const { songId } = req.body;

  if (!songId) {
    return res.status(400).json({ message: 'ID pesme je obavezan' });
  }

  const result = likeSongService(userId, songId);

  if (result.error) {
    return res.status(result.status!).json({ message: result.message });
  }

  return res.status(200).json({ message: 'Pesma je uspešno lajkovana' });
};

export const fetchCategories = (req: Request, res: Response) => {
  const result = getCategories();

  if (result.error) {
    return res.status(result.status!).json({ message: result.message });
  }

  return res.status(200).json(result.data);
};

export const getFilteredSongs = (req: Request, res: Response) => {
  const filters: SongFilters = {
    kategorija_id: req.query.kategorija_id
      ? parseInt(req.query.kategorija_id as string)
      : undefined,
    redosled:
      req.query.redosled === 'lajkovi' || req.query.redosled === 'datum'
        ? req.query.redosled
        : undefined,
  };

  const result = getSongsByFilters(filters);

  if (result.error) {
    return res.status(result.status!).json({ message: result.message });
  }

  return res.json(result.data);
};

export const getLikedSongs = (req: Request, res: Response) => {
  const userId = res.locals.user.id;
  const filters: SongFilters = {
    kategorija_id: req.query.kategorija_id
      ? parseInt(req.query.kategorija_id as string)
      : undefined,
    redosled:
      req.query.redosled === 'lajkovi' || req.query.redosled === 'datum'
        ? req.query.redosled
        : undefined,
  };

  const result = getLikedSongsByFilter(userId, filters);

  if (result.error) {
    return res.status(result.status!).json({ message: result.message });
  }

  return res.status(200).json(result.data);
};
