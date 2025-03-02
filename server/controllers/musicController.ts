import { Request, Response } from 'express';
import {
  likeSongService,
  getCategories,
  getSongsByFilters,
  getLikedSongsByFilter,
  unlikeSongService,
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
  const userId = res.locals.user?.id;
  const filters: SongFilters = {
    kategorijaId: req.query.kategorijaId
      ? parseInt(req.query.kategorijaId as string)
      : undefined,
    redosled: req.query.redosled === 'lajkovi' ? 'lajkovi' : undefined,
  };

  const result = getSongsByFilters(filters, userId);

  if (result.error) {
    return res.status(result.status!).json({ message: result.message });
  }

  return res.json(result.data);
};

export const getLikedSongs = (req: Request, res: Response) => {
  const userId = res.locals.user.id;

  const result = getLikedSongsByFilter(userId);

  if (result.error) {
    return res.status(result.status!).json({ message: result.message });
  }

  return res.status(200).json(result.data);
};

export const unlikeSong = (req: Request, res: Response) => {
  const userId = res.locals.user.id;
  const { songId } = req.body;

  if (!songId) {
    return res.status(400).json({ message: 'ID pesme je obavezan' });
  }

  const result = unlikeSongService(userId, songId);

  if (result.error) {
    return res.status(result.status!).json({ message: result.message });
  }

  return res
    .status(200)
    .json({ message: 'Pesma je uspešno uklonjena iz lajkovanih' });
};
