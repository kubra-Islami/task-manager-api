import express from 'express';
import taskController from '../controllers/taskController.js';
import authMiddleware  from "../middlewares/authMiddleware.js";
import subtaskController from "../controllers/subtaskController.js";


const router = express.Router();


router.post('/add_task',authMiddleware,taskController.createTask);
router.get('/task_list',authMiddleware,taskController.getTasksByUser);
router.delete("/delete/:taskId",authMiddleware,taskController.deleteTask)
router.patch("/update/:id", authMiddleware, taskController.updateTask);


// DELETE /tasks/:taskId/subtasks/:subtaskId
router.delete("/:taskId/delete_subtask/:subtaskId", authMiddleware, subtaskController.deleteSubtask);
router.put("/:taskId/update_subtask/:subtaskId", authMiddleware, subtaskController.updateSubtask);



export default router;
