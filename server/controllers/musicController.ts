import { Request, Response } from 'express';
import {
  likeSongService,
  getCategories,
  getSongsByFilters,
} from '@server/services/musicService';

const handleError = (res: Response, error: any, message: string) => {
  console.error(error);
  return res.status(500).json({ message, error });
};

export const likeSong = (req: Request, res: Response) => {
  const userId = res.locals.user.id;
  const { songId } = req.body;

  if (!songId) {
    return res.status(400).json({ message: 'ID pesme je obavezan' });
  }

  try {
    const result = likeSongService(userId, songId);

    if (result.error) {
      const statusCode = result.status ?? 500;
      return res.status(statusCode).json({ message: result.message });
    }

    return res.status(200).json({ message: 'Pesma je uspešno lajkovana' });
  } catch (error) {
    return handleError(res, error, 'Greška na serveru');
  }
};

export const fetchCategories = (req: Request, res: Response) => {
  try {
    res.status(200).json(getCategories());
  } catch (error) {
    return handleError(res, error, 'Greška pri preuzimanju kategorija');
  }
};

export const getFilteredSongs = (req: Request, res: Response) => {
  try {
    const { kategorija_id, redosled } = req.query;

    const filters: {
      kategorija_id?: number;
      redosled?: 'lajkovi';
    } = {
      kategorija_id: kategorija_id
        ? parseInt(kategorija_id as string)
        : undefined,
      redosled: redosled === 'lajkovi' ? 'lajkovi' : undefined,
    };

    res.json(getSongsByFilters(filters));
  } catch (error) {
    return handleError(res, error, 'Greška na serveru pri preuzimanju pesama');
  }
};
