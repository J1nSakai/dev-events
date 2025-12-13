import mongoose from "mongoose";

// Define the connection cache type
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Extend the global object to include our mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

// Initialize cache on the global object to persist across hot reloads in development
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Establishes a connection to MongoDB using Mongoose
 * Caches the connection to prevent multiple connections during developement hot reloads
 * @returns Promise resolving to the Mongoose instance
 */

async function connectDB(): Promise<typeof mongoose> {
  // return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // return existing connection promise if one is in progress
  if (!cached.promise) {
    // validate MongoDB URI exists
    if (!MONGODB_URI) {
      throw new Error(
        "Please define the MongoDB URI variable inside the .env.local file"
      );
    }

    const options = {
      bufferCommands: false, // Disable Mongoose buffering
    };

    // create a new connection promise
    cached.promise = mongoose
      .connect(MONGODB_URI!, options)
      .then((mongoose) => mongoose);
  }

  try {
    // wait for the connection to establish
    cached.conn = await cached.promise;
  } catch (error) {
    // reset promise on error to retry
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;
