import app from './app';

const PORT = parseInt(process.env.PORT || '3000', 10);

console.log('Starting server...');
console.log(`PORT: ${PORT}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV || 'development'}`);

// Start the server immediately
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server successfully started on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Host: 0.0.0.0`);
  console.log(`Server is ready to accept connections`);
});
