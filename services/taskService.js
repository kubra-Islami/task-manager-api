import taskModel from '../models/taskModel.js';
import subtaskModel from "../models/subtaskModel.js";
import db from '../config/db.js';

const createTask = async ({taskData, subtasks = [], userId}) => {
    if (!taskData.title) throw new Error('title is required');
    // 1. Create main task
    const task = await taskModel.create({...taskData, user_id: userId});
    // 2. If subtasks provided, add them
    if (subtasks && subtasks.length > 0) {
        const createdSubtasks = await Promise.all(
            subtasks.map(name => subtaskModel.create({name, task_id: task.id}))
        );
        task.subtasks = createdSubtasks;
    }
    console.log(task)
    return task;
}


const getTasksByUserId = async (userId) => {
    if (!userId) throw new Error('User is required');
    return taskModel.getAllTask(userId);
}

const deleteTaskById = async (taskId, userId) => {
    if (!taskId) throw new Error('Task ID is required');

    const tasks = await taskModel.getAllTask(userId);
    // console.log(tasks);
    const exists = tasks.find(t => t.id === parseInt(taskId));

    // console.log(exists);
    if (!exists) throw new Error('Task not found or not yours');

    return taskModel.deleteTask(taskId);
}

const updateTaskById = async (taskId, userId, taskData) => {
    if (!taskId) throw new Error('Task ID is required');

    const client = await db.connect();

    try {
        await client.query('BEGIN');

        // Exclude subtasks before updating main task
        const { subtasks, ...mainTaskData } = taskData;
        const updatedTask = await taskModel.updateTask(taskId, userId, mainTaskData);

        // Handle subtasks if provided
        if (Array.isArray(subtasks)) {
            if (subtasks.every(s => typeof s === 'string')) {
                // Replace-all mode
                await client.query(`DELETE FROM subtasks WHERE task_id = $1`, [taskId]);
                const created = await Promise.all(
                    subtasks.map(name =>
                        client.query(
                            `INSERT INTO subtasks (name, task_id) VALUES ($1, $2) RETURNING *`,
                            [name, taskId]
                        ).then(res => res.rows[0])
                    )
                );
                updatedTask.subtasks = created;
            } else {
                // Delta mode (as before)
                const toCreate = [];
                const toUpdate = [];
                const toDelete = [];

                for (const s of subtasks) {
                    if (s && typeof s === 'object') {
                        if (s._delete && s.id) toDelete.push(s.id);
                        else if (s.id && s.name) toUpdate.push({ id: s.id, name: s.name });
                        else if (!s.id && s.name) toCreate.push(s.name);
                    }
                }

                await Promise.all(
                    toUpdate.map(u =>
                        client.query(
                            `UPDATE subtasks SET name = $1 WHERE id = $2 AND task_id = $3`,
                            [u.name, u.id, taskId]
                        )
                    )
                );

                await Promise.all(
                    toCreate.map(name =>
                        client.query(
                            `INSERT INTO subtasks (name, task_id) VALUES ($1, $2)`,
                            [name, taskId]
                        )
                    )
                );

                if (toDelete.length) {
                    await client.query(
                        `DELETE FROM subtasks WHERE id = ANY ($1::int[]) AND task_id = $2`,
                        [toDelete, taskId]
                    );
                }

                const { rows } = await client.query(
                    `SELECT id, name, task_id, created_at
                     FROM subtasks
                     WHERE task_id = $1
                     ORDER BY id`,
                    [taskId]
                );
                updatedTask.subtasks = rows;
            }
        }

        await client.query('COMMIT');
        return updatedTask;
    } catch (e) {
        await client.query('ROLLBACK');
        throw new Error('Error updating task: ' + e.message);
    } finally {
        client.release();
    }
}

export default {
    createTask,
    getTasksByUserId,
    deleteTaskById,
    updateTaskById
};