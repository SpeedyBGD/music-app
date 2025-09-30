import app from './app.js';
import db from './utils/db.js';

const PORT = parseInt(process.env.PORT || '3000', 10);

console.log('Starting server...');
console.log(`PORT: ${PORT}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV || 'development'}`);

// Initialize database tables if they don't exist
function initializeDatabase() {
  try {
    console.log('Initializing database tables...');
    
    // Create tables if they don't exist
    db.exec(`
      CREATE TABLE IF NOT EXISTS kategorije (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        naziv TEXT NOT NULL
      );
    `);
    
    db.exec(`
      CREATE TABLE IF NOT EXISTS pesme (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        naziv TEXT NOT NULL,
        umetnik TEXT NOT NULL,
        youtubeId TEXT NOT NULL,
        kategorijaId INTEGER,
        uneto DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (kategorijaId) REFERENCES kategorije(id) ON DELETE SET NULL
      );
    `);
    
    db.exec(`
      CREATE TABLE IF NOT EXISTS korisnici (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        lozinka TEXT NOT NULL,
        refreshToken TEXT
      );
    `);
    
    db.exec(`
      CREATE TABLE IF NOT EXISTS lajkovanje (
        korisnikId INTEGER NOT NULL,
        pesmaId INTEGER NOT NULL,
        UNIQUE(korisnikId, pesmaId),
        FOREIGN KEY (korisnikId) REFERENCES korisnici(id) ON DELETE CASCADE,
        FOREIGN KEY (pesmaId) REFERENCES pesme(id) ON DELETE CASCADE
      );
    `);
    
    // Insert sample data if tables are empty
    const categoryCount = db.prepare('SELECT COUNT(*) as count FROM kategorije').get() as { count: number };
    if (categoryCount.count === 0) {
      console.log('Inserting sample data...');
      
      db.exec(`
        INSERT INTO kategorije (naziv) VALUES
          ('Pop'),
          ('Rok'),
          ('Hip Hop'),
          ('Narodna'),
          ('Elektronska'),
          ('Džez');
      `);
      
      db.exec(`
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
      `);
      
      db.exec(`
        INSERT INTO korisnici (email, lozinka) VALUES
          ('test@example.com', '$2a$10$ouaY1tC5Pn0gJSW2lE0f0e/2Iu6IHKLFxzOMwwTEBFIoDvGCXdA1i');
      `);
      
      db.exec(`
        INSERT INTO lajkovanje (korisnikId, pesmaId) VALUES
          (1, 2);
      `);
    }
    
    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}

// Add error handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

try {
  // Initialize database first
  initializeDatabase();
  
  // Start the server
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server successfully started on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Host: 0.0.0.0`);
    console.log(`Server is ready to accept connections`);
  });

  server.on('error', (error) => {
    console.error('Server error:', error);
    process.exit(1);
  });

} catch (error) {
  console.error('Failed to start server:', error);
  process.exit(1);
}
