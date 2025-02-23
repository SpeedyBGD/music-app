import db from '@server/utils/db';

export const getSongsByFilters = (filters: {
  kategorija_id?: number;
  redosled?: 'lajkovi';
}) => {
  let query = `
    SELECT pesme.*, 
           IFNULL(COUNT(lajkovanje.pesma_id), 0) AS broj_lajkova
    FROM pesme
    LEFT JOIN lajkovanje ON pesme.id = lajkovanje.pesma_id
  `;
  const params: any = [];

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
};

export const getCategories = () => {
  const stmt = db.prepare('SELECT id, naziv FROM kategorije');
  return stmt.all();
};
