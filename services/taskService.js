import taskModel from '../models/taskModel.js';
// import getAllTask from '../models/getAllTask.js';


const createTask = async ({taskData, userId}) => {
    if (!taskData.title) throw new Error('Title is required');
    return await taskModel.create({...taskData,user_id: userId});
}
const getTasksByUserId  = async (userId) =>{
    if (!userId) throw new Error('User is required');
    return taskModel.getAllTask(userId);
}

const deleteTaskById = async (taskId, userId) => {
    if (!taskId) throw new Error('Task ID is required');

    const tasks = await taskModel.getAllTask(userId);
    // console.log(tasks);
    const exists = tasks.find(t=> t.id === parseInt(taskId));

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