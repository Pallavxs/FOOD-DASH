import dotenv from "dotenv";

dotenv.config();

if(!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not defined in environment variables");
}

if(!process.env.MONGO_URI) {
    console.error("DB_URI is not defined in environment variables");
}

if(!process.env.REDIS_URL) {
    console.error("Redis configuration is not fully defined in environment variables");
}

if(!process.env.CLOUD_NAME || !process.env.CLOUD_API_KEY || !process.env.CLOUD_API_SECRET) {
    console.error("Cloudinary configuration is not fully defined in environment variables");
}


const config = {
    MONGO_URI: process.env.MONGO_URI ,
    JWT_SECRET: process.env.JWT_SECRET, 
    REDIS_URL: process.env.REDIS_URL,
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_API_KEY: process.env.CLOUD_API_KEY,
    CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
};

export default config;