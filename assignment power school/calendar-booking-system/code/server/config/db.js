
const mongoose = require('mongoose');
/**
 * Establishes a connection to MongoDB using Mongoose.
 * @returns {Promise<void>} A promise that resolves once the connection is established.
 * @throws {Error} If there's an error connecting to MongoDB.
 */
const connectDB = async () => {
  try {
    // Connect to MongoDB using the provided MONGO_URI
    await mongoose.connect(process.env.MONGO_URI, {});

    console.log('MongoDB connected');
  } catch (err) {
    // Log and exit the process if connection fails
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
