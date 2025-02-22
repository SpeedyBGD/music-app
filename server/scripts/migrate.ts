// File: server/scripts/migrate.ts
import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.resolve(__dirname, '../database.db');

if (fs.existsSync(DB_PATH)) {
  fs.unlinkSync(DB_PATH);
}

const db = new sqlite3.Database(DB_PATH);
const dbRun = promisify(db.run.bind(db));

const migrations = [
  `
  CREATE TABLE songs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    video_url TEXT NOT NULL
  );
  `,
  `
  INSERT INTO songs (title, artist, video_url) VALUES
    ('Song 1', 'Artist 1', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
    ('Song 2', 'Artist 2', 'https://www.youtube.com/watch?v=oHg5SJYRHA0'),
    ('Song 3', 'Artist 3', 'https://www.youtube.com/watch?v=DLzxrzFCyOs');
  `,
];

async function runMigrations(): Promise<void> {
  try {
    for (const sql of migrations) {
      await dbRun(sql);
      console.log('Migration executed:', sql.split('\n')[0]);
    }
    console.log('All migrations completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    db.close();
  }
}

runMigrations();
