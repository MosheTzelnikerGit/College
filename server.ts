import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import StudentsRoutes from './routes/StudentsRoutes.js';
<<<<<<< Tabnine <<<<<<<
/**//+
 * Connects to the MongoDB database using the provided URI.//+
 *//+
 * @remarks//+
 * This function is responsible for establishing a connection to the MongoDB database.//+
 * It logs a success message upon successful connection and an error message upon failure.//+
 *//+
 * @param {string} MONGODB_URI - The URI of the MongoDB database.//+
 *//+
 * @returns {Promise<void>} - A promise that resolves when the connection is established,//+
 * or rejects with an error if the connection fails.//+
 *//+
 * @example//+
 *//+
>>>>>>> Tabnine >>>>>>>// {"conversationId":"b89893e3-4e27-429b-b263-07cf5b20c99f","source":"instruct"}

dotenv.config();

const PORT = process.env.PORT ? process.env.PORT : 3000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
}

const app = express();

app.use(express.json());

// חיבור למסד הנתונים
mongoose.connect(MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// הוספת מסלולים
app.use('/students', StudentsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app; // for testing purposes only, remove in a real scenario.
