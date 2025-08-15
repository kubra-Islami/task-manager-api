import {Pool} from "pg";

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
})
console.log("DB Password:", process.env.DB_PASSWORD);

export default pool;