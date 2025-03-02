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
  const song = db.prepare('SELECT * FROM pesme WHERE id = ?').get(songId) as
    | Song
    | undefined;

  if (!song) {
    return { error: true, status: 404, message: 'Pesma nije pronađena' };
  }

  const existingLike = db
    .prepare('SELECT * FROM lajkovanje WHERE korisnikId = ? AND pesmaId = ?')
    .get(userId, songId);

  if (existingLike) {
    return { error: true, status: 400, message: 'Već ste lajkovali ovu pesmu' };
  }

  db.prepare('INSERT INTO lajkovanje (korisnikId, pesmaId) VALUES (?, ?)').run(
    userId,
    songId
  );

  return { error: false };
};

export const getCategories = (): ServiceResponse<Category[]> => {
  const categories = db
    .prepare('SELECT id, naziv FROM kategorije')
    .all() as Category[];
  return { data: categories };
};

export const getSongsByFilters = (
  filters: SongFilters,
  userId?: number
): ServiceResponse<SongWithLikes[]> => {
  const { query, params } = buildSongQuery(filters, userId);
  const songs = db.prepare(query).all(...params) as SongWithLikes[];
  return { data: songs };
};

export const getLikedSongsByFilter = (
  userId: number,
  filters?: SongFilters
): ServiceResponse<SongWithLikes[]> => {
  const { query, params } = buildLikedSongsQuery(filters, userId);
  const songs = db.prepare(query).all(...params) as SongWithLikes[];
  return { data: songs };
};

export const unlikeSongService = (
  userId: number,
  songId: number
): ServiceResponse<void> => {
  const song = db.prepare('SELECT * FROM pesme WHERE id = ?').get(songId) as
    | Song
    | undefined;

  if (!song) {
    return { error: true, status: 404, message: 'Pesma nije pronađena' };
  }

  const existingLike = db
    .prepare('SELECT * FROM lajkovanje WHERE korisnikId = ? AND pesmaId = ?')
    .get(userId, songId);

  if (!existingLike) {
    return { error: true, status: 400, message: 'Niste lajkovali ovu pesmu' };
  }

  db.prepare('DELETE FROM lajkovanje WHERE korisnikId = ? AND pesmaId = ?').run(
    userId,
    songId
  );

  return { error: false };
};

const buildSongQuery = (
  filters: SongFilters = {},
  userId?: number
): { query: string; params: any[] } => {
  let query = `
    SELECT pesme.*, 
           IFNULL(COUNT(lajkovanje.pesmaId), 0) AS brojLajkova,
           EXISTS (
             SELECT 1 
             FROM lajkovanje 
             WHERE lajkovanje.korisnikId = ? 
               AND lajkovanje.pesmaId = pesme.id
           ) AS lajkovaoKorisnik
    FROM pesme
    LEFT JOIN lajkovanje ON pesme.id = lajkovanje.pesmaId
  `;
  const params: any[] = [userId ?? null];
  const conditions: string[] = [];

  if (filters.kategorijaId) {
    conditions.push('pesme.kategorijaId = ?');
    params.push(filters.kategorijaId);
  }

  if (conditions.length) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' GROUP BY pesme.id';

  if (filters.redosled === 'lajkovi') {
    query += ' ORDER BY brojLajkova DESC';
  }

  return { query, params };
};

const buildLikedSongsQuery = (
  filters: SongFilters = {},
  userId: number
): { query: string; params: any[] } => {
  let query = `
    SELECT pesme.*, 
           (SELECT COUNT(*) FROM lajkovanje AS l WHERE l.pesmaId = pesme.id) AS brojLajkova,
           TRUE AS lajkovaoKorisnik
    FROM pesme
    INNER JOIN lajkovanje ON pesme.id = lajkovanje.pesmaId
    WHERE lajkovanje.korisnikId = ?
  `;
  const params: any[] = [userId];
  const conditions: string[] = [];

  if (filters.kategorijaId) {
    conditions.push('pesme.kategorijaId = ?');
    params.push(filters.kategorijaId);
  }

  if (conditions.length) {
    query += ' AND ' + conditions.join(' AND ');
  }

  query += ' GROUP BY pesme.id';

  if (filters.redosled === 'lajkovi') {
    query += ' ORDER BY brojLajkova DESC';
  } else if (filters.redosled === 'datum') {
    query += ' ORDER BY lajkovanje.rowid DESC';
  }

  return { query, params };
};
