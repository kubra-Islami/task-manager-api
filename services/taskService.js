import taskModel from '../models/taskModel.js';
import subtaskModel from "../models/subtaskModel.js";

const createTask = async ({taskData, subtasks = [], userId}) => {
    if (!taskData.title) throw new Error('Title is required');
    // 1. Create main task
    const task = await taskModel.create({ ...taskData, user_id: userId });
    // 2. If subtasks provided, add them
    if (subtasks && subtasks.length > 0) {
        const createdSubtasks = await Promise.all(
            subtasks.map(name => subtaskModel.create({ name, task_id: task.id }))
        );
        task.subtasks = createdSubtasks;
    }

    return task;
}


const getTasksByUserId = async (userId) => {
    if (!userId) throw new Error('User is required');
    return taskModel.getAllTask(userId);
}

const deleteTaskById = async (taskId, userId) => {
    if (!taskId) throw new Error('Task ID is required');

    const tasks = await taskModel.getAllTask(userId);
    // console.log(tasks);
    const exists = tasks.find(t => t.id === parseInt(taskId));

    // console.log(exists);
    if (!exists) throw new Error('Task not found or not yours');

    return taskModel.deleteTask(taskId);
}

const updateTaskById = async (taskId, userId, taskData) => {
    if (!taskId) throw new Error('Task ID is required');
    return taskModel.updateTask(taskId, userId, taskData);

}
export default {
    createTask,
    getTasksByUserId,
    deleteTaskById,
    updateTaskById
};