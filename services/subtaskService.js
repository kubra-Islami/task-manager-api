import subtaskModel from "../models/subtaskModel.js";

const deleteSubtask = async (taskId, subtaskId) => {
    if (!taskId || !subtaskId) {
        throw new Error("Task ID and Subtask ID are required");
    }

    return await subtaskModel.deleteSubtask(taskId, subtaskId,name);
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
export default {
    deleteSubtask,updateSubtask
};
