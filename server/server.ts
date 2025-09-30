import app from './app';

const PORT = parseInt(process.env.PORT || '3000', 10);

console.log('Starting server...');
console.log(`PORT: ${PORT}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV || 'development'}`);

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
  // Start the server immediately
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
