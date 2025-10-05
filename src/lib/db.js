import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export const connect = async () => {
  try {
    // Return existing connection if it exists
    if (cached.conn) return cached.conn;

    // If no promise exists, initiate a new connection
    if (!cached.promise) {
      cached.promise = mongoose.connect(process.env.MONGODB_URL, {
        dbName: 'Ecommerce',
        bufferCommands: false,
      });
    }

    // Await the connection and store it
    //console.log("✅ MongoDB trying");
    cached.conn = await cached.promise;
    //console.log("✅ MongoDB connected");
    return cached.conn;
  } catch (error) {
    //console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};
