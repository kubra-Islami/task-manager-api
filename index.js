import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import corsOptions from './coresOptions.js';

import cookieParser from 'cookie-parser';

import express from "express";
import userRoutes from './routes/users.js';
import taskRoutes from './routes/tasks.js';
const app = express();

const PORT = process.env.PORT || 3000;

// Use CORS middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
    res.json({ status: "ok", message: "Task Manager API is running 🚀" });
});

app.use("/user", userRoutes);
app.use("/task", taskRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
