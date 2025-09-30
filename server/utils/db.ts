import Database from 'better-sqlite3';

const dbPath = process.env.DB_PATH || './baza.sqlite';

console.log(`Connecting to database at: ${dbPath}`);

let db: Database.Database;

try {
  db = new Database(dbPath);
  console.log('Database connected successfully');
  
  // Test the connection
  db.prepare('SELECT 1 as test').get();
  console.log('Database connection test passed');
  
} catch (error) {
  console.error('Database connection failed:', error);
  process.exit(1);
}

export default db;
