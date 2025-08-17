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
export default {
    createTask,
    getTasksByUserId,
};