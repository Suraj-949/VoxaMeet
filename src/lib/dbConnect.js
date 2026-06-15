// vercel ke freee version me 10 seconds deta hai to fetch api aur paid version mein 30 seconds aur agar 10 seconds mein nhi hua toh timeout error deta hai, so humne dbConnect.js file banayi hai jisme hum mongoose ka connection bana ke rakhenge aur jab bhi hume database se connect hona hoga hum is function ko call karenge  


import mongoose from "mongoose";

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
}

// check if we have a connection to database or not to avoid rerendering as vercel is serverless and creates new connection every time....toh isliye humne ek global variable bana rakha hai jisme connection ko store karenge
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    console.log("Attempting Database Connection")

    if (cached.conn) {
        console.log("Using existing MongoDB connection")
        return cached.conn;
    }

    if (!cached.promise) {
        const object = {
            bufferCommands: false,              // disbale the buffer commands to prevent holding queries while reconnecting
            serverSelectionTimeoutMS: 5000,
        }
        console.log("Creating new MongoDB connection...")

        cached.promise = mongoose.connect(mongoURI, object).then((mongoose) => {
            return mongoose;
        })
    }

    try {
        cached.conn = await cached.promise;    
        console.log("MongoDB connected successfully")
        
    } catch (error) {
        cached.promise = null; 
        console.log("MongoDB connection failed")
        throw error;
    }

    return cached.conn;
}

export default dbConnect;