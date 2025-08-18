import db from '../config/db.js';

const create = async (task) => {
    try {
        const { title, description, due_date, priority, status, user_id } = task;

        // Validate priority if exists
        let validPriority = priority;
        if (priority) {
            const allowed = ["low", "medium", "high"];
            if (!allowed.includes(priority.toLowerCase())) {
                throw new Error("Priority must be 'low', 'medium', or 'high'");
            }
            validPriority = priority.toLowerCase();
        }

        // Validate status if exists
        let validStatus = status;
        if (status) {
            const allowed = ["todo", "in_progress", "done", "on_hold"];
            if (!allowed.includes(status.toLowerCase())) {
                throw new Error("Status must be 'todo', 'in_progress', 'done' or 'on_hold'");
            }
            validStatus = status.toLowerCase();
        }

        // Build insert dynamically
        const columns = ["title", "description", "due_date", "user_id"];
        const values = [title, description, due_date, user_id];
        const placeholders = ["$1", "$2", "$3", "$4"];
        let i = 5;

        if (validPriority !== undefined) {
            columns.push("priority");
            values.push(validPriority);
            placeholders.push(`$${i}`);
            i++;
        }

        if (validStatus !== undefined) {
            columns.push("status");
            values.push(validStatus);
            placeholders.push(`$${i}`);
            i++;
        }

        const result = await db.query(
            `INSERT INTO tasks (${columns.join(", ")})
             VALUES (${placeholders.join(", ")})
                 RETURNING *`,
            values
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

        return result.rows[0];

    } catch (err) {
        throw new Error("Error deleting task: " + err.message);
    }

}

const updateTask = async (taskId, userId, updatedData = {}) => {
    try {
        if (Object.keys(updatedData).length === 0) {
            const result = await db.query(
                `SELECT * FROM tasks WHERE id = $1 AND user_id = $2`,
                [taskId, userId]
            );
            return result.rows[0];
        }


        if (updatedData.priority) {
            const valid = ["low", "medium", "high"];
            const v = updatedData.priority.toLowerCase();
            if (!valid.includes(v)) throw new Error("Priority must be 'low', 'medium', or 'high'");
            updatedData.priority = v;
        }

        if (updatedData.status) {
            const valid = ["todo", "in_progress", "done", "on_hold"];
            const v = updatedData.status.toLowerCase();
            if (!valid.includes(v)) throw new Error("Status must be 'todo', 'in_progress', 'done' or 'on_hold'");
            updatedData.status = v;
        }


        const { subtasks, ...columnsOnly } = updatedData;
        if (Object.keys(columnsOnly).length === 0) {
            const { rows } = await db.query(
                `SELECT * FROM tasks WHERE id = $1 AND user_id = $2`,
                [taskId, userId]
            );
            if (!rows.length) throw new Error("Task not found or not yours");
            return rows[0];
        }


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

        if (!result.rows.length) throw new Error("Task not found or not yours");

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