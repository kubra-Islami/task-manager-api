import db from '../config/db.js';

const create = async ({name, task_id}) => {
    try {
        const result = await db.query(
            `INSERT INTO subtasks (name, task_id)
             VALUES ($1, $2) RETURNING *`,
            [name, task_id]
        );
        return result.rows[0];
    } catch (err) {
        throw new Error("Error creating subtask: " + err.message);
    }
}

const deleteSubtask = async (taskId, subtaskId) => {
    try {
        const result = await db.query(
            `DELETE
             FROM subtasks
             WHERE id = $1
               AND task_id = $2 RETURNING *`,
            [subtaskId, taskId]
        );

        if (result.rows.length === 0) {
            throw new Error("subtask not found");
        }

        return result.rows[0];

    } catch (err) {
        throw new Error("Error deleting subtask : " + err.message);
    }

}

const updateSubtask = async (taskId, subtaskId, name) => {
    try {
        const result = await db.query(
            `UPDATE subtasks SET name = $1 WHERE id = $2 AND task_id = $3 RETURNING *     
            `,[name, subtaskId, taskId]
        );
        if (result.rows.length === 0) {
            throw new Error("Subtask not found for this task");
        }
        return result.rows[0];

    } catch (err) {
        throw new Error("Error updating subtask: " + err.message);
    }
}

const getAllSubtasksByTaskId = async (taskId) => {
    const { rows } = await db.query(
        `SELECT id, name, task_id, created_at FROM subtasks WHERE task_id = $1 ORDER BY id`,
        [taskId]
    );
    return rows;
};
export default {
    create, deleteSubtask, updateSubtask,getAllSubtasksByTaskId
};
