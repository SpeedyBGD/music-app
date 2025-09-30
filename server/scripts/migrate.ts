import Database from 'better-sqlite3';
import fs from 'fs';

const DB_PATH = process.env.DB_PATH || 'baza.sqlite';

// Only delete the database file if it exists and we're in development
if (process.env.NODE_ENV !== 'production' && fs.existsSync(DB_PATH)) {
  try {
    fs.unlinkSync(DB_PATH);
    console.log('Deleted existing database file');
  } catch (error) {
    console.warn('Could not delete existing database file:', error);
  }
}

let db: Database.Database;
try {
  db = new Database(DB_PATH);
  console.log(`Connected to database at: ${DB_PATH}`);
} catch (error) {
  console.error('Failed to connect to database:', error);
  process.exit(1);
}

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
    uneto DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (kategorijaId) REFERENCES kategorije(id) ON DELETE SET NULL
  );
  `,
  `
  CREATE TABLE korisnici (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    lozinka TEXT NOT NULL,
    refreshToken TEXT
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
INSERT INTO pesme (naziv, umetnik, youtubeId, kategorijaId, uneto) VALUES
    ('Bohemian Rhapsody', 'Queen', 'fJ9rUzIMcZQ', 2, '2025-02-20 10:00:00'),
    ('Shape of You', 'Ed Sheeran', 'JGwWNGJdvx8', 1, '2025-02-21 12:00:00'),
    ('Uptown Funk', 'Mark Ronson ft. Bruno Mars', 'OPf0YbXqDm0', 1, '2025-02-21 14:00:00'),
    ('Humble', 'Kendrick Lamar', 'tvTRZJ-4EyI', 3, '2025-02-22 09:00:00'),
    ('Take Five', 'Dave Brubeck', 'vmDDOFXSgAs', 6, '2025-02-22 11:00:00'),
    ('Despacito', 'Luis Fonsi ft. Daddy Yankee', 'kJQP7kiw5Fk', 1, '2025-02-23 15:00:00'),
    ('Thunderstruck', 'AC/DC', 'v2AC41dglnM', 2, '2025-02-23 17:00:00'),
    ('Bad Guy', 'Billie Eilish', 'DyDfgMOUjCI', 5, '2025-02-24 08:00:00'),
    ('Old Town Road', 'Lil Nas X ft. Billy Ray Cyrus', '7ysFgElQtjI', 3, '2025-02-24 10:00:00'),
    ('Smooth Criminal', 'Michael Jackson', 'h_D3VFfhvs4', 1, '2025-02-24 12:00:00');
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

// Function to check if table exists
function tableExists(tableName: string): boolean {
  try {
    const result = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`).get(tableName);
    return !!result;
  } catch {
    return false;
  }
}

try {
  console.log('Starting database migrations...');
  
  // Check if tables already exist (production scenario)
  const tablesExist = tableExists('kategorije') && tableExists('pesme') && tableExists('korisnici') && tableExists('lajkovanje');
  
  if (tablesExist && process.env.NODE_ENV === 'production') {
    console.log('Database tables already exist, skipping migrations');
    db.close();
    process.exit(0);
  }
  
  db.exec('BEGIN TRANSACTION;');
  
  migrations.forEach((sql, index) => {
    try {
      db.exec(sql);
      console.log(`Migration ${index + 1} completed successfully`);
    } catch (error) {
      console.error(`Migration ${index + 1} failed:`, error);
      throw error;
    }
  });
  
  db.exec('COMMIT;');
  console.log('All migrations completed successfully');
} catch (error) {
  console.error('Migration failed, rolling back:', error);
  try {
    db.exec('ROLLBACK;');
  } catch (rollbackError) {
    console.error('Rollback failed:', rollbackError);
  }
  db.close();
  process.exit(1);
} finally {
  db.close();
  console.log('Database connection closed');
}
