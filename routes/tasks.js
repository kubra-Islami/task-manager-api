import express from 'express';
import taskController from '../controllers/taskController.js';
import authMiddleware  from "../middlewares/authMiddleware.js";
import subtaskController from "../controllers/subtaskController.js";

const router = express.Router();

// task routes
router.post('/add_task',authMiddleware,taskController.createTask);
router.get('/task_list',authMiddleware,taskController.getTasksByUser);
router.delete("/delete/:taskId",authMiddleware,taskController.deleteTask)
router.patch("/update/:id", authMiddleware, taskController.updateTask);

// subtasks routes
router.post("/:taskId/add_subtasks", authMiddleware, subtaskController.createSubtask);
router.delete("/:taskId/delete_subtask/:subtaskId", authMiddleware, subtaskController.deleteSubtask);
router.put("/:taskId/update_subtask/:subtaskId", authMiddleware, subtaskController.updateSubtask);



export default router;
