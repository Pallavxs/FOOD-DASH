import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI).then(() => {
            console.log("Connected to MongoDB");
        })
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectToDb;