const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const itemRoutes = require('./routes/itemRoutes');
const notFound = require('./middleware/notFoundMiddleware');
const errorHandler = require('./middleware/errorMiddleware');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Security: Configure CORS to restrict access only to the specified frontend origin
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin, matching FRONTEND_URL, wildcard, or any *.vercel.app domain
    if (
      !origin || 
      !FRONTEND_URL || 
      FRONTEND_URL === '*' || 
      origin === FRONTEND_URL || 
      origin.endsWith('.vercel.app')
    ) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy blocked access from origin: ${origin}`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

// JSON body parsing middleware (10mb limit to support base64 image uploads)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware to ensure DB connection is active (vital for Vercel serverless functions)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: err.message
    });
  }
});

// API Health Check (supports both /api/health and /health)
app.get(['/api/health', '/health'], (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Product & Task Management Hub API is healthy',
    timestamp: new Date().toISOString()
  });
});

// Root API Welcome
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Product & Task Management Hub API is running'
  });
});

// API Routes (supports both /api/items and /items)
app.use('/api/items', itemRoutes);
app.use('/items', itemRoutes);

// 404 Handler for undefined API routes
app.use(notFound);

// Centralized Error Handling Middleware
app.use(errorHandler);

// Start server strictly after successful database connection (only for local/standalone, not Vercel serverless)
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Accepting requests from frontend at: ${FRONTEND_URL}`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

if (!process.env.VERCEL) {
  startServer();
}

module.exports = app;
