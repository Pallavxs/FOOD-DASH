import dotenv from "dotenv";

dotenv.config();

if(!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not defined in environment variables");
}

if(!process.env.MONGO_URI) {
    console.error("DB_URI is not defined in environment variables");
}


const config = {
    MONGO_URI: process.env.MONGO_URI ,
    JWT_SECRET: process.env.JWT_SECRET 
};

export default config;