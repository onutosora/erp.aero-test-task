import mysql from "mysql2/promise";
import { config } from "./config.js";

export const pool = mysql.createPool({
    host: config.DB_HOST,
    port: config.DB_PORT,
    database: config.DB_DATABASE,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10
});
