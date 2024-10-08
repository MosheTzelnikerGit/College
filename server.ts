import express from 'express';
// import StudentsRoutes from './routes/StudentsRoutes.js';

import dotenv from 'dotenv';


const PORT = process.env.PORT ? process.env.PORT : 3000;
const app = express();

app.use(express.json());

// app.use('/students', StudentsRoutes);   

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app; // for testing purposes only, remove in a real scenario.

// import mongoose from 'mongoose';

