import { Request, Response } from 'express';
import {
  likeSongService,
  getCategories,
  getSongsByFilters,
  getLikedSongsByFilter,
  unlikeSongService,
  searchSongs,
  addSongService,
} from '@server/services/musicService';
import { SongFilters } from '@server/models/Song';

export const likeSong = (req: Request, res: Response) => {
  const userId = res.locals.user?.id;
  const { songId } = req.body;

  if (!userId) {
    return res.status(401).json({ message: 'Neautorizovan pristup' });
  }

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
      ? Number(req.query.kategorijaId)
      : undefined,
    redosled:
      req.query.redosled === 'lajkovi' || req.query.redosled === 'datum'
        ? req.query.redosled
        : undefined,
  };

  const result = getSongsByFilters(filters, userId);

  if (result.error) {
    return res.status(result.status!).json({ message: result.message });
  }

  return res.json(result.data);
};

export const getLikedSongs = (req: Request, res: Response) => {
  const userId = res.locals.user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Neautorizovan pristup' });
  }

  const filters: SongFilters = {
    kategorijaId: req.query.kategorijaId
      ? Number(req.query.kategorijaId)
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

export const unlikeSong = (req: Request, res: Response) => {
  const userId = res.locals.user?.id;
  const { songId } = req.body;

  if (!userId) {
    return res.status(401).json({ message: 'Neautorizovan pristup' });
  }

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

export const searchSongsController = (req: Request, res: Response) => {
  const userId = res.locals.user?.id;
  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    return res
      .status(400)
      .json({ message: 'Pretraga zahteva tekstualni upit' });
  }

  const result = searchSongs(query, userId);

  if (result.error) {
    return res.status(result.status!).json({ message: result.message });
  }

  return res.status(200).json(result.data);
};

export const addSong = (req: Request, res: Response) => {
  const userId = res.locals.user?.id;
  const { naziv, umetnik, youtubeId, kategorijaId } = req.body;

  if (!userId) {
    return res.status(401).json({ message: 'Neautorizovan pristup' });
  }

  const fields = [
    { name: 'Naziv pesme', value: naziv, isString: true },
    { name: 'Umetnik', value: umetnik, isString: true },
    { name: 'YouTube ID', value: youtubeId, isString: true },
    { name: 'Kategorija ID', value: kategorijaId, isString: false },
  ];

  for (const field of fields) {
    if (
      !field.value ||
      (field.isString &&
        (typeof field.value !== 'string' || field.value.trim() === '')) ||
      (!field.isString && isNaN(Number(field.value)))
    ) {
      return res
        .status(400)
        .json({
          message: `${field.name} je obavezan i mora biti ${
            field.isString ? 'tekst' : 'broj'
          }`,
        });
    }
  }

  const result = addSongService({
    naziv: naziv.trim(),
    umetnik: umetnik.trim(),
    youtubeId: youtubeId.trim(),
    kategorijaId: Number(kategorijaId),
  });

  if (result.error) {
    return res.status(result.status!).json({ message: result.message });
  }

  return res
    .status(201)
    .json({ message: 'Pesma je uspešno dodata', songId: result.data });
};
