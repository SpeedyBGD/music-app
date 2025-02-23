import { Request, Response } from 'express';
import {
  getCategories,
  getSongsByFilters,
} from '@server/services/musicService';

export const getFilteredSongs = async (req: Request, res: Response) => {
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

    res.json(await getSongsByFilters(filters));
  } catch (error) {
    res.status(500).json({ message: 'Interna greška na serveru' });
  }
};

export const fetchCategories = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await getCategories());
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Greška prilikom dobijanja kategorija', error });
  }
};
