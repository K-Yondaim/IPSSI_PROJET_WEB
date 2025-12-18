const axios = require('axios');
const { pool } = require('../config/db');

const insertRandomUsers = async () => {
    try {
        const urls = [1, 2, 3].map(() => axios.get('https://randomuser.me/api/'));
        const results = await Promise.all(urls);
        const users = results.map(r => r.data.results[0]);

        await Promise.all(users.map(u => {
            const fullName = `${u.name.first} ${u.name.last}`;
            const password = u.login.password;
            return pool.execute(
                'INSERT INTO users (name, password) VALUES (?, ?)',
                [fullName, password]
            );
        }));

        console.log('Inserted 3 users into database.');
        return { message: 'Inserted 3 users into database.' };
    } catch (err) {
        console.error('Error inserting users:', err.message);
        throw err;
    }
};

const getAllUsers = async () => {
    const [rows] = await pool.query('SELECT id, name FROM users');
    return rows;
};

const getUserById = async (id) => {
    const [rows] = await pool.execute('SELECT id, name FROM users WHERE id = ?', [id]);
    return rows;
};

const createUser = async (userData) => {
    const { name, password } = userData;
    if (!name || !password) {
        throw new Error('Name and password are required');
    }
    const [result] = await pool.execute('INSERT INTO users (name, password) VALUES (?, ?)', [name, password]);
    return { id: result.insertId, name, password };
};

module.exports = {
    insertRandomUsers,
    getAllUsers,
    getUserById,
    createUser
};
