import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.resolve(__dirname, '../baza.db');

if (fs.existsSync(DB_PATH)) {
  fs.unlinkSync(DB_PATH);
}

const db = new Database(DB_PATH);

const migrations = [
  `
  CREATE TABLE kategorije (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    naziv TEXT NOT NULL
  );
  `,
  `
  CREATE TABLE pesme (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    naziv TEXT NOT NULL,
    umetnik TEXT NOT NULL,
    video_url TEXT NOT NULL,
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES kategorije(id) ON DELETE SET NULL
  );
  `,
  `
  CREATE TABLE korisnici (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    lozinka TEXT NOT NULL,
    jwt_token TEXT
  );
  `,
  `
  CREATE TABLE lajkovanje (
    korisnik_id INTEGER NOT NULL,
    pesma_id INTEGER NOT NULL,
    UNIQUE(korisnik_id, pesma_id),
    FOREIGN KEY (korisnik_id) REFERENCES korisnici(id) ON DELETE CASCADE,
    FOREIGN KEY (pesma_id) REFERENCES pesme(id) ON DELETE CASCADE
  );
  `,
  `
  INSERT INTO kategorije (naziv) VALUES
    ('Pop'),
    ('Rock'),
    ('Hip-hop');
  `,
  `
  INSERT INTO pesme (naziv, umetnik, video_url, category_id) VALUES
    ('Pesma 1', 'Izvođač 1', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 1),
    ('Pesma 2', 'Izvođač 2', 'https://www.youtube.com/watch?v=oHg5SJYRHA0', 2),
    ('Pesma 3', 'Izvođač 3', 'https://www.youtube.com/watch?v=DLzxrzFCyOs', 3);
  `,
];

function runMigrations(): void {
  try {
    db.exec('BEGIN TRANSACTION;');

    for (const sql of migrations) {
      db.exec(sql);
      console.log('Migracija izvršena:', sql.split('\n')[0]);
    }

    db.exec('COMMIT;');
    console.log('Sve migracije su uspešno završene!');
  } catch (error) {
    db.exec('ROLLBACK;');
    console.error('Migracija je neuspešna:', error);
  } finally {
    db.close();
  }
}

runMigrations();
