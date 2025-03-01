import db from '@server/utils/db';
import Song, {
  SongFilters,
  Category,
  SongWithLikes,
} from '@server/models/Song';

interface ServiceResponse<T> {
  error?: boolean;
  data?: T;
  status?: number;
  message?: string;
}

export const likeSongService = (
  userId: number,
  songId: number
): ServiceResponse<void> => {
  try {
    const song = db.prepare('SELECT * FROM pesme WHERE id = ?').get(songId) as
      | Song
      | undefined;

    if (!song) {
      return { error: true, status: 404, message: 'Pesma nije pronađena' };
    }

    const existingLike = db
      .prepare(
        'SELECT * FROM lajkovanje WHERE korisnik_id = ? AND pesma_id = ?'
      )
      .get(userId, songId);

    if (existingLike) {
      return {
        error: true,
        status: 400,
        message: 'Već ste lajkovali ovu pesmu',
      };
    }

    db.prepare(
      'INSERT INTO lajkovanje (korisnik_id, pesma_id) VALUES (?, ?)'
    ).run(userId, songId);

    return { error: false };
  } catch (error) {
    return { error: true, status: 500, message: 'Greška u bazi podataka' };
  }
};

export const getCategories = (): ServiceResponse<Category[]> => {
  try {
    const categories = db
      .prepare('SELECT id, naziv FROM kategorije')
      .all() as Category[];
    return { data: categories };
  } catch (error) {
    return { error: true, status: 500, message: 'Greška u bazi podataka' };
  }
};

export const getSongsByFilters = (
  filters: SongFilters,
  userId?: number // Add userId as an optional parameter
): ServiceResponse<SongWithLikes[]> => {
  try {
    let query = `
      SELECT pesme.*, 
             IFNULL(COUNT(lajkovanje.pesma_id), 0) AS broj_lajkova,
             EXISTS (
               SELECT 1 
               FROM lajkovanje 
               WHERE lajkovanje.korisnik_id = ? 
               AND lajkovanje.pesma_id = pesme.id
             ) AS liked_by_user
      FROM pesme
      LEFT JOIN lajkovanje ON pesme.id = lajkovanje.pesma_id
    `;
    const params: any[] = [userId || null]; // Add userId to the parameters
    const conditions: string[] = [];

    if (filters.kategorija_id) {
      conditions.push('kategorija_id = ?');
      params.push(filters.kategorija_id);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' GROUP BY pesme.id';

    if (filters.redosled === 'lajkovi') {
      query += ' ORDER BY broj_lajkova DESC';
    }

    const songs = db.prepare(query).all(...params) as SongWithLikes[];
    return { data: songs };
  } catch (error) {
    return { error: true, status: 500, message: 'Greška u bazi podataka' };
  }
};

export const getLikedSongsService = (
  userId: number
): ServiceResponse<SongWithLikes[]> => {
  try {
    const query = `
      SELECT pesme.*, 
             IFNULL(COUNT(lajkovanje.pesma_id), 0) AS broj_lajkova
      FROM pesme
      LEFT JOIN lajkovanje ON pesme.id = lajkovanje.pesma_id
      WHERE lajkovanje.korisnik_id = ?
      GROUP BY pesme.id
    `;

    const songs = db.prepare(query).all(userId) as SongWithLikes[];
    return { data: songs };
  } catch (error) {
    return { error: true, status: 500, message: 'Greška u bazi podataka' };
  }
};
