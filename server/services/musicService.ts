import db from '../utils/db.js';
import Song, {
  SongFilters,
  Category,
  SongWithLikes,
} from '../models/Song.js';

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
  if (!song)
    return { error: true, status: 404, message: 'Pesma nije pronađena' };

  const existingLike = db
    .prepare('SELECT * FROM lajkovanje WHERE korisnikId = ? AND pesmaId = ?')
    .get(userId, songId);
  if (existingLike)
    return { error: true, status: 400, message: 'Već ste lajkovali ovu pesmu' };

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
  if (!song)
    return { error: true, status: 404, message: 'Pesma nije pronađena' };

  const existingLike = db
    .prepare('SELECT * FROM lajkovanje WHERE korisnikId = ? AND pesmaId = ?')
    .get(userId, songId);
  if (!existingLike)
    return { error: true, status: 400, message: 'Niste lajkovali ovu pesmu' };

  db.prepare('DELETE FROM lajkovanje WHERE korisnikId = ? AND pesmaId = ?').run(
    userId,
    songId
  );
  return { error: false };
};

export const searchSongs = (
  searchQuery: string,
  userId?: number
): ServiceResponse<SongWithLikes[]> => {
  const searchTerm = `%${searchQuery}%`;
  const query = `
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
    LEFT JOIN kategorije ON pesme.kategorijaId = kategorije.id
    WHERE pesme.naziv LIKE ?
       OR pesme.umetnik LIKE ?
       OR kategorije.naziv LIKE ?
    GROUP BY pesme.id
    ORDER BY 
      CASE 
        WHEN pesme.naziv LIKE ? THEN 3
        WHEN pesme.umetnik LIKE ? THEN 2
        WHEN kategorije.naziv LIKE ? THEN 1
        ELSE 0
      END DESC, 
      brojLajkova DESC
  `;
  const params = [
    userId ?? null,
    searchTerm,
    searchTerm,
    searchTerm,
    searchTerm,
    searchTerm,
    searchTerm,
  ];
  const songs = db.prepare(query).all(...params) as SongWithLikes[];
  return { data: songs };
};

export const addSongService = (songData: {
  naziv: string;
  umetnik: string;
  youtubeId: string;
  kategorijaId: number;
}): ServiceResponse<number> => {
  const { naziv, umetnik, youtubeId, kategorijaId } = songData;

  const categoryExists = db
    .prepare('SELECT id FROM kategorije WHERE id = ?')
    .get(kategorijaId);
  if (!categoryExists)
    return { error: true, status: 400, message: 'Kategorija ne postoji' };

  const existingSong = db
    .prepare('SELECT id FROM pesme WHERE youtubeId = ?')
    .get(youtubeId);
  if (existingSong)
    return {
      error: true,
      status: 400,
      message: 'Pesma sa ovim YouTube ID već postoji',
    };

  const result = db
    .prepare(
      "INSERT INTO pesme (naziv, umetnik, youtubeId, kategorijaId, uneto) VALUES (?, ?, ?, ?, DATETIME('now'))"
    )
    .run(naziv, umetnik, youtubeId, kategorijaId);

  return { data: result.lastInsertRowid as number };
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

  if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');

  query += ' GROUP BY pesme.id';

  if (filters.redosled === 'lajkovi') query += ' ORDER BY brojLajkova DESC';
  else if (filters.redosled === 'datum') query += ' ORDER BY pesme.uneto DESC';

  return { query, params };
};

const buildLikedSongsQuery = (
  filters: SongFilters = {},
  userId: number
): { query: string; params: any[] } => {
  let query = `
    SELECT pesme.*, 
           (SELECT COUNT(*) FROM lajkovanje AS l WHERE l.pesmaId = pesme.id) AS brojLajkova,
           1 AS lajkovaoKorisnik
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

  if (conditions.length) query += ' AND ' + conditions.join(' AND ');

  query += ' GROUP BY pesme.id';

  if (filters.redosled === 'lajkovi') query += ' ORDER BY brojLajkova DESC';
  else if (filters.redosled === 'datum') query += ' ORDER BY pesme.uneto DESC';

  return { query, params };
};
