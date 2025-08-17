import taskService from '../services/taskService.js';

const getTasksByUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await taskService.getTasksByUserId(userId);

        res.status(201).json({
            status: "success",
            tasks,
            user_id: userId,
        });

    } catch (err) {
        res.status(500).json({ status: "failed", error: error.message });

    }
}

const createTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const {title, description, due_date, priority} = req.body;

        const task = await taskService.createTask({
            taskData: { title, description, due_date, priority },
            userId
        });

        res.status(201).json({
            status: "success",
            task,
            user_id: userId,
        });

    } catch (error) {
        console.log("taskController.js error file ")
        res.status(500).json({status: "failed", error: error.message});
    }
}

export default {
    createTask,
    getTasksByUser
}