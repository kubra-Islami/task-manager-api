import express from 'express';
import taskController from '../controllers/taskController.js';
import authMiddleware  from "../middlewares/authMiddleware.js";


const router = express.Router();


router.post('/add_task',authMiddleware,taskController.createTask);
router.get('/my_tasks',authMiddleware,taskController.getTasksByUser);
router.delete("/delete/:taskId",authMiddleware,taskController.deleteTask)
router.patch("/update/:id", authMiddleware, taskController.updateTask);



export default router;
