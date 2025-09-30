import { Request, Response } from 'express';
import {
  likeSongService,
  getCategories,
  getSongsByFilters,
  getLikedSongsByFilter,
  unlikeSongService,
  searchSongs,
  addSongService,
} from '../services/musicService.js';
import { SongFilters } from '../models/Song.js';
import User from '../models/User.js';

export const likeSong = (req: Request, res: Response) => {
  const user = res.locals.user as User;
  const { songId } = req.body;

  if (!songId) return res.status(400).json({ message: 'ID pesme je obavezan' });

  const result = likeSongService(user.id, songId);
  if (result.error)
    return res.status(result.status!).json({ message: result.message });

  return res.status(200).json({ message: 'Pesma je uspešno lajkovana' });
};

export const fetchCategories = (req: Request, res: Response) => {
  const result = getCategories();
  if (result.error)
    return res.status(result.status!).json({ message: result.message });
  return res.status(200).json(result.data);
};

export const getFilteredSongs = (req: Request, res: Response) => {
  const user = res.locals.user as User | null;
  const filters: SongFilters = {
    kategorijaId: req.query.kategorijaId
      ? Number(req.query.kategorijaId)
      : undefined,
    redosled:
      req.query.redosled === 'lajkovi' || req.query.redosled === 'datum'
        ? req.query.redosled
        : undefined,
  };

  const result = getSongsByFilters(filters, user?.id);
  if (result.error)
    return res.status(result.status!).json({ message: result.message });
  return res.json(result.data);
};

export const getLikedSongs = (req: Request, res: Response) => {
  const user = res.locals.user as User;
  const filters: SongFilters = {
    kategorijaId: req.query.kategorijaId
      ? Number(req.query.kategorijaId)
      : undefined,
    redosled:
      req.query.redosled === 'lajkovi' || req.query.redosled === 'datum'
        ? req.query.redosled
        : undefined,
  };

  const result = getLikedSongsByFilter(user.id, filters);
  if (result.error)
    return res.status(result.status!).json({ message: result.message });
  return res.status(200).json(result.data);
};

export const unlikeSong = (req: Request, res: Response) => {
  const user = res.locals.user as User;
  const { songId } = req.body;

  if (!songId) return res.status(400).json({ message: 'ID pesme je obavezan' });

  const result = unlikeSongService(user.id, songId);
  if (result.error)
    return res.status(result.status!).json({ message: result.message });

  return res
    .status(200)
    .json({ message: 'Pesma je uspešno uklonjena iz lajkovanih' });
};

export const searchSongsController = (req: Request, res: Response) => {
  const user = res.locals.user as User | null;
  const { query } = req.query;

  if (!query || typeof query !== 'string')
    return res
      .status(400)
      .json({ message: 'Pretraga zahteva tekstualni upit' });

  const result = searchSongs(query, user?.id);
  if (result.error)
    return res.status(result.status!).json({ message: result.message });
  return res.status(200).json(result.data);
};

export const addSong = (req: Request, res: Response) => {
  const user = res.locals.user as User;
  const { naziv, umetnik, youtubeId, kategorijaId } = req.body;

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
      return res.status(400).json({
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
  if (result.error)
    return res.status(result.status!).json({ message: result.message });
  return res
    .status(201)
    .json({ message: 'Pesma je uspešno dodata', songId: result.data });
};
