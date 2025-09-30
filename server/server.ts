import app from './app';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const PORT = process.env.PORT || 3000;

// Run migrations on server start if needed
async function runMigrationsIfNeeded() {
  try {
    console.log('Checking if database migrations are needed...');
    await execAsync('node dist/scripts/migrate.js');
    console.log('Database migrations completed successfully');
  } catch (error) {
    console.warn('Migration failed or not needed:', error instanceof Error ? error.message : String(error));
    // Continue server startup even if migration fails
  }
}

// Start server
async function startServer() {
  // Run migrations first
  await runMigrationsIfNeeded();
  
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);
