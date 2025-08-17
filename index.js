import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';

import express from "express";
import userRoutes from './routes/users.js';
import taskRoutes from './routes/tasks.js';
const app = express();

const PORT = process.env.PORT || 3000;
app.use(cookieParser());
app.use(express.json());
app.use("/user", userRoutes);
app.use("/task", taskRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
