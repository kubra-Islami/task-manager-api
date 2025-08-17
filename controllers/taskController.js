import taskService from '../services/taskService.js';

const getAllTasks = async (req, res) => {
    try {


    } catch (err) {
        // res.status(500).json({error: err, message});
    }
}

// console.log("taskController.js *************************");
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
    createTask
}