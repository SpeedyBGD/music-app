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
  filters: SongFilters
): ServiceResponse<SongWithLikes[]> => {
  try {
    const { query, params } = buildSongQuery(filters); // Use the helper function
    const songs = db.prepare(query).all(...params) as SongWithLikes[];
    return { data: songs };
  } catch (error) {
    return { error: true, status: 500, message: 'Greška u bazi podataka' };
  }
};

export const getLikedSongsByFilter = (
  userId: number,
  filters?: SongFilters
): ServiceResponse<SongWithLikes[]> => {
  try {
    const { query, params } = buildSongQuery(filters, userId); // Use the helper function
    const songs = db.prepare(query).all(...params) as SongWithLikes[];
    return { data: songs };
  } catch (error) {
    return { error: true, status: 500, message: 'Greška u bazi podataka' };
  }
};

const buildSongQuery = (
  filters?: SongFilters,
  userId?: number
): { query: string; params: any[] } => {
  let query = `
    SELECT pesme.*, 
           IFNULL(COUNT(lajkovanje.pesma_id), 0) AS broj_lajkova
    FROM pesme
    LEFT JOIN lajkovanje ON pesme.id = lajkovanje.pesma_id
  `;
  const params: any[] = [];
  const conditions: string[] = [];

  if (userId) {
    conditions.push('lajkovanje.korisnik_id = ?');
    params.push(userId);
  }

  if (filters?.kategorija_id) {
    conditions.push('kategorija_id = ?');
    params.push(filters.kategorija_id);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' GROUP BY pesme.id';

  if (filters?.redosled === 'lajkovi') {
    query += ' ORDER BY broj_lajkova DESC';
  } else if (filters?.redosled === 'datum') {
    query += ' ORDER BY datum DESC';
  }

  return { query, params };
};
