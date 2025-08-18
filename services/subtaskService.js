import subtaskModel from "../models/subtaskModel.js";

const deleteSubtask = async (taskId, subtaskId) => {
    if (!taskId || !subtaskId) {
        throw new Error("Task ID and Subtask ID are required");
    }

    return await subtaskModel.deleteSubtask(taskId, subtaskId);
};

const updateSubtask = async (taskId, subtaskId,name) => {
    if (!taskId || !subtaskId) {
        throw new Error("Task ID and Subtask ID are required");
    }

    if (!name || name.trim() === ""){
        throw new Error("Subtask name cannot be empty");
    }
    return await subtaskModel.updateSubtask(taskId, subtaskId, name);

}
const createMultipleSubtasks = async ({ subtasks, taskId }) => {
    return Promise.all(
        subtasks.map((name) => subtaskModel.create({ name, task_id: taskId }))
    );
};
export default {
    deleteSubtask,updateSubtask,createMultipleSubtasks
};
