import express from 'express';
import taskController from '../controllers/taskController.js';
import authMiddleware  from "../middlewares/authMiddleware.js";


const router = express.Router();


router.post('/add_task',authMiddleware,taskController.createTask);
// router.post('/',authMiddleware,taskController.getTasks);
// router.delete("/:id",authMiddleware,taskController.deleteTask)

// console.log("tasks.js file ")

export default router;
