import Database from 'better-sqlite3';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const dbPath = path.resolve(__dirname, '../baza.db');

const db = new Database(dbPath);

export default db;
