const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/note.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// Static frontend (built) for single-service deployments
const frontendDistPath = path.join(__dirname, '..', '..', 'Frontend', 'dist');
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
  });
});

// 404 handler (SPA fallback when frontend is built)
app.use((req, res) => {
  if (
    fs.existsSync(frontendDistPath) &&
    req.method === 'GET' &&
    !req.path.startsWith('/api')
  ) {
    return res.sendFile(path.join(frontendDistPath, 'index.html'));
  }

  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

module.exports = app;
