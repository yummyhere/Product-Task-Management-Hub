const mongoose = require('mongoose');

let cachedConnection = null;

/**
 * Connect to MongoDB database using Mongoose
 * Uses connection caching to support both standalone servers and Vercel serverless functions
 */
const connectDB = async () => {
  // If connection is already open, reuse it (crucial for serverless environments)
  if (cachedConnection && mongoose.connection.readyState >= 1) {
    return cachedConnection;
  }

  try {
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is not defined in .env');
    }

    const conn = await mongoose.connect(mongoUri, {
      bufferCommands: false,
    });
    cachedConnection = conn;
    console.log(`MongoDB connected successfully to host: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB connection failure: ${error.message}`);
    if (!process.env.VERCEL) {
      process.exit(1);
    }
    throw error;
  }
};

module.exports = connectDB;

