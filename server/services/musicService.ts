import db from '@server/utils/db';

const handleDbError = (error: any) => {
  console.error(error);
  return {
    error: true,
    status: 500,
    message: 'Greška u bazi podataka',
  };
};

export const likeSongService = (userId: number, songId: number) => {
  try {
    const song = db.prepare('SELECT * FROM pesme WHERE id = ?').get(songId);
    if (!song) {
      return { error: true, status: 404, message: 'Pesma nije pronađena' };
    }

    const existingLike = db
      .prepare('SELECT * FROM lajkovanje WHERE korisnik_id = ? AND pesma_id = ?')
      .get(userId, songId);

    if (existingLike) {
      return {
        error: true,
        status: 400,
        message: 'Već ste lajkovali ovu pesmu',
      };
    }

    db.prepare('INSERT INTO lajkovanje (korisnik_id, pesma_id) VALUES (?, ?)')
      .run(userId, songId);

    return { error: false };
  } catch (error) {
    console.error(userId, songId, error);
    return handleDbError(error);
  }
};

export const getCategories = () => {
  try {
    const stmt = db.prepare('SELECT id, naziv FROM kategorije');
    return stmt.all();
  } catch (error) {
    return handleDbError(error);
  }
};

export const getSongsByFilters = (filters: {
  kategorija_id?: number;
  redosled?: 'lajkovi';
}) => {
  try {
    let query = `
      SELECT pesme.*, 
             IFNULL(COUNT(lajkovanje.pesma_id), 0) AS broj_lajkova
      FROM pesme
      LEFT JOIN lajkovanje ON pesme.id = lajkovanje.pesma_id
    `;
    const params: any[] = [];
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

    const stmt = db.prepare(query);
    return stmt.all(...params);
  } catch (error) {
    return handleDbError(error);
  }
};
