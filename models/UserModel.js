import db from "../config/db.js";

const createUser = async (user) => {
    try {
        const { name, email, password } = user;
        const result = await db.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3) RETURNING *`, [name, email, password]);

        return result.rows[0];
    } catch (err) {
        throw new Error("Error creating user " + err.message);
    }
}


const getUserByEmail = async (email) => {
    const result = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
    return result.rows[0];
};


export default {
    createUser,
    getUserByEmail,
}