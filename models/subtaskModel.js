import db from '../config/db.js';
const create = async ({name,task_id})=>{
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

export default {
    create,
};
