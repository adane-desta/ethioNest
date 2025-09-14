
import dotenv from 'dotenv'
import mysql from 'mysql2'

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

export default pool.promise();