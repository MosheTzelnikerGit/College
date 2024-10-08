import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI || ""); // ודא ש-MONGO_URI לא undefined
        console.log("Connect" + connect.connection.host);
    } catch (error) {
        console.error(error);
        process.exit(1); // יציאה במקרה של כשל
    }
}

export default connectDB;
