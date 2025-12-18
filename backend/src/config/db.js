const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'webapp_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Convert to promise-based pool
const promisePool = pool.promise();

// Function to initialize tables (replacing the direct db.run calls in server.js)
// In a real app, use migrations. Here we do simple execute on startup if needed, 
// or rely on a separate init script. For now, we'll export the pool.
// We can add a helper to init DB.

const initDb = async () => {
    try {
        const [usersTable] = await promisePool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL
            )
        `);
        console.log("Users table verified.");

        const [commentsTable] = await promisePool.query(`
            CREATE TABLE IF NOT EXISTS comments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                content TEXT NOT NULL
            )
        `);
        console.log("Comments table verified.");
    } catch (error) {
        console.error("Error initializing database tables:", error);
    }
};

module.exports = {
    pool: promisePool,
    initDb
};
