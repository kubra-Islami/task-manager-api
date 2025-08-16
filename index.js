import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import userRoutes from './routes/users.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/user", userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
