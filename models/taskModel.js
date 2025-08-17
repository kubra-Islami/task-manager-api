import db from '../config/db.js';

const create = async (task) => {
    try {
        const {title, description, due_date, priority, user_id} = task;

        const validPriorities = ["low", "medium", "high"];
        if (!validPriorities.includes(priority.toLowerCase())) {
            throw new Error("Priority must be 'low', 'medium', or 'high'");
        }

        const result = await db.query(
            `INSERT INTO tasks (title, description, due_date, priority, user_id)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [title, description, due_date, priority, user_id]
        );
        return result.rows[0];
    } catch (err) {
        throw new Error("Error creating task " + err.message);
    }
}

const getAllTask = async (userId) => {
    try {
        const result = await db.query(
            `SELECT *
             FROM tasks
             WHERE user_id = $1`,
            [userId]
        );
        return result.rows;

    } catch (err) {
        throw new Error("Error getting tasks" + err.message);
    }
}

const deleteTask = async (taskId) => {
    try {
        const result = await db.query(
            `DELETE
             FROM tasks
             WHERE id = $1 RETURNING *`, [taskId]
        );

        if (result.rows.length === 0) {
            throw new Error("Task not found");
        }

        // return deleted task
        return result.rows[0];

    } catch (err) {
        throw new Error("Error deleting task: " + err.message);
    }

}

const updateTask = async (taskId, userId, updatedData) => {
    try {
        if (updatedData.priority) {
            const validPriorities = ["low", "medium", "high"];
            if (!validPriorities.includes(updatedData.priority.toLowerCase())) {
                throw new Error("Priority must be 'low', 'medium', or 'high'");
            }
            // Ensure we send lowercase to DB
            updatedData.priority = updatedData.priority.toLowerCase();
        }


        // Build the query dynamically based on the fields in updatedData
        const fields = [];
        const values = [];
        let i = 1;

        for (const key in updatedData) {
            fields.push(`${key} = $${i}`);
            values.push(updatedData[key]);
            i++;
        }

        // Add userId and taskId for the WHERE clause
        values.push(taskId, userId);

        const query = `
            UPDATE tasks
            SET ${fields.join(", ")}
            WHERE id = $${i}
              AND user_id = $${i + 1} RETURNING *;
        `;

        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            throw new Error("Task not found or not yours");
        }

        return result.rows[0];
    } catch (err) {
        throw new Error("Error updating task: " + err.message);
    }
}
export default {
    create,
    getAllTask,
    deleteTask,
    updateTask
};