import db from '../config/db.js';

const create = async (task) => {
    try {
    const {title, description,due_date, priority,user_id} = task;
        const result = await db.query(
            `INSERT INTO tasks (title, description, due_date, priority,user_id)
             VALUES ($1, $2, $3, $4,$5) RETURNING *`,
            [title, description, due_date, priority,user_id]
        );
        return result.rows[0];
    } catch (err) {
        throw new Error("Error creating task" + err.message);
    }
}



const getAllTask = async (userId) => {
    try{
        const result = await db.query(
            `SELECT * FROM tasks WHERE user_id = $1`,
            [userId]
        );
        return result.rows;

    }catch(err){
        throw new Error("Error getting tasks" + err.message);
    }
}


export default {
    create,
    getAllTask
};