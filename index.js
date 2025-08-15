import dotenv from 'dotenv';
dotenv.config();
import express from "express";
const app = express();


const PORT = process.env.PORT || 3000;

import taskRoutes from './routes/tasks.js';
import userRoutes from './routes/users.js';



app.use(express.json());
// app.use("/task",taskRoutes);
app.use("/user",userRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// console.log("index.js");
