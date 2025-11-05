import app from "./app.js";
import { config } from "./config.js";
import { pool } from "./db.js";

async function startServer() {
    try {
        await testMyDbConnection();
        startApp();
    } catch (e) {
        console.log('Server is down with error: ');
        console.log(e);
        process.exit(1);
    }
}

async function startApp() {
    app.listen(
        config.PORT,
        () => console.log(`Server is running on port ${config.PORT}...`)
    );
}

async function testMyDbConnection() {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    console.log(`Database "${config.DB_DATABASE}" is connected.`);
}

startServer();
