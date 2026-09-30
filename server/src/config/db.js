const mongoose = require('mongoose');

/**
 * Connect to MongoDB database using Mongoose
 * Ensures the connection is established before starting the HTTP server
 */
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is not defined in .env');
    }

    // Mask credentials when logging for security
    const maskedUri = mongoUri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@');
    
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB connected successfully to host: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB connection failure: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
