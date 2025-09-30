import Database from 'better-sqlite3';

const dbPath = process.env.DB_PATH || './baza.sqlite';

const db = new Database(dbPath);

export default db;
