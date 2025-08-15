import db from "../config/db.js";

const createUser = async (user) => {
    // console.log("Reached model");
    // const {name, email, password} = user;
    // console.log("Inserting into DB:", name, email, password);

    try {
        const {name, email, password} = user;
        const result = await db.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3) RETURNING *`, [name, email, password]);


        return result.rows[0];
    } catch (err) {
        // console.error("DB ERROR:", err);
        throw new Error("Error creating user on UserModel " + err.message);
    }

}


export default {
    createUser,
}