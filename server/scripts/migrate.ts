import Database from 'better-sqlite3';
import fs from 'fs';

const DB_PATH = 'baza.sqlite';

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
    youtubeId TEXT NOT NULL,
    kategorijaId INTEGER,
    FOREIGN KEY (kategorijaId) REFERENCES kategorije(id) ON DELETE SET NULL
  );
  `,
  `
  CREATE TABLE korisnici (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    lozinka TEXT NOT NULL,
    jwtToken TEXT,
    tokenBlacklistedAt TEXT
  );
  `,
  `
  CREATE TABLE lajkovanje (
    korisnikId INTEGER NOT NULL,
    pesmaId INTEGER NOT NULL,
    UNIQUE(korisnikId, pesmaId),
    FOREIGN KEY (korisnikId) REFERENCES korisnici(id) ON DELETE CASCADE,
    FOREIGN KEY (pesmaId) REFERENCES pesme(id) ON DELETE CASCADE
  );
  `,
  `
INSERT INTO kategorije (naziv) VALUES
    ('Pop'),
    ('Rok'),
    ('Hip Hop'),
    ('Narodna'),
    ('Elektronska'),
    ('Džez');
  `,
  `
INSERT INTO pesme (naziv, umetnik, youtubeId, kategorijaId) VALUES
    ('Bohemian Rhapsody', 'Queen', 'fJ9rUzIMcZQ', 2),
    ('Shape of You', 'Ed Sheeran', 'JGwWNGJdvx8', 1),
    ('Uptown Funk', 'Mark Ronson ft. Bruno Mars', 'OPf0YbXqDm0', 1),
    ('Humble', 'Kendrick Lamar', 'tvTRZJ-4EyI', 3),
    ('Take Five', 'Dave Brubeck', 'vmDDOFXSgAs', 6),
    ('Despacito', 'Luis Fonsi ft. Daddy Yankee', 'kJQP7kiw5Fk', 1),
    ('Thunderstruck', 'AC/DC', 'v2AC41dglnM', 2),
    ('Bad Guy', 'Billie Eilish', 'DyDfgMOUjCI', 5),
    ('Old Town Road', 'Lil Nas X ft. Billy Ray Cyrus', '7ysFgElQtjI', 3),
    ('Smooth Criminal', 'Michael Jackson', 'h_D3VFfhvs4', 1);
  `,
  `
  INSERT INTO korisnici (email, lozinka) VALUES
    ('test@example.com', '$2a$10$ouaY1tC5Pn0gJSW2lE0f0e/2Iu6IHKLFxzOMwwTEBFIoDvGCXdA1i');
  `,
  `
  INSERT INTO lajkovanje (korisnikId, pesmaId) VALUES
    (1, 2);
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
