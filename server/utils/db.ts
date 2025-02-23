import Database from 'better-sqlite3';

const dbPath = './baza.sqlite';

const db = new Database(dbPath);

export default db;
