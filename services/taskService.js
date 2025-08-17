import taskModel from '../models/taskModel.js';

const createTask = async ({taskData, userId}) => {
    if (!taskData.title) throw new Error('Title is required');
    return await taskModel.create({...taskData,user_id: userId});
}

export default {
    createTask
};