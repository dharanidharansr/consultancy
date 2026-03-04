import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

function getMongoConnectionUri() {
    const rawUri = process.env.MONGODB_URI;

    if (!rawUri) {
        throw new Error("MONGODB_URI is not defined in environment variables");
    }

    const defaultDbName = process.env.MONGODB_DB_NAME || "glossary-mart";

    try {
        const parsedUri = new URL(rawUri);
        const hasDbInPath = parsedUri.pathname && parsedUri.pathname !== "/";

        if (!hasDbInPath) {
            parsedUri.pathname = `/${defaultDbName}`;
        }

        return parsedUri.toString();
    } catch (error) {
        const sanitized = rawUri.replace(/\/+$/, "");
        return `${sanitized}/${defaultDbName}`;
    }
}

async function connectDB() {
    try {
        if (cached.conn) {
            return cached.conn;
        }

        if (!cached.promise) {
            const opts = {
                bufferCommands: false,
            };

            const connectionUri = getMongoConnectionUri();

            console.log("Connecting to MongoDB...");
            cached.promise = mongoose.connect(
                connectionUri,
                opts
            ).then(connection => {
                console.log("MongoDB connected successfully");
                return connection;
            });
        }

        cached.conn = await cached.promise;
        return cached.conn;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
}

export default connectDB;