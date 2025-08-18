import subtaskService from "../services/subtaskService.js";

const deleteSubtask = async (req, res) => {
    try {
        const { taskId, subtaskId } = req.params;

        const deletedSubtask = await subtaskService.deleteSubtask(taskId, subtaskId);

        res.status(200).json({
            status: "success",
            message: "Subtask deleted successfully",
            subtask: deletedSubtask,
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            error: error.message,
        });
    }
};

const updateSubtask = async (req, res) => {
    try {
        const { taskId, subtaskId } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Subtask name is required" });
        }

        const updatedSubtask = await subtaskService.updateSubtask(taskId, subtaskId, name);

        res.status(200).json({
            status: "success",
            message: "Subtask updated successfully",
            subtask: updatedSubtask,
        });

    }catch (error) {
        res.status(500).json({
            status: "failed",
            error: error.message,
        });
    }
}

const createSubtask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { subtasks  } = req.body;

        if (!subtasks || !Array.isArray(subtasks) || subtasks.length === 0) {
            return res.status(400).json({ error: "Subtasks array is required" });
        }

        const createdSubtasks = await subtaskService.createMultipleSubtasks({
            subtasks,
            taskId,
        });

        res.status(201).json({
            status: "success",
            subtasks: createdSubtasks,
        });

    }catch (error) {
        res.status(500).json({ status: "failed", error: error.message });
    }
}

export default {
    deleteSubtask,updateSubtask,createSubtask
};
