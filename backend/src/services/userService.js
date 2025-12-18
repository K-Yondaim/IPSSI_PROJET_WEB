const axios = require('axios');
const { User } = require('../models');

const insertRandomUsers = async () => {
    try {
        const urls = [1, 2, 3].map(() => axios.get('https://randomuser.me/api/'));
        const results = await Promise.all(urls);
        const users = results.map(r => r.data.results[0]);

        await Promise.all(users.map(u => {
            const fullName = `${u.name.first} ${u.name.last}`;
            const password = u.login.password;
            // ORM: Create method handles INSERT safely
            return User.create({ name: fullName, password: password });
        }));

        console.log('Inserted 3 users into database.');
        return { message: 'Inserted 3 users into database.' };
    } catch (err) {
        console.error('Error inserting users:', err.message);
        throw err;
    }
};

const getAllUsers = async () => {
    // ORM: findAll with attributes selection
    const users = await User.findAll({
        attributes: ['id', 'name'] // Select only safe fields
    });
    return users;
};

const getUserById = async (id) => {
    // ORM: findByPk is safer and cleaner
    const user = await User.findByPk(id, {
        attributes: ['id', 'name'] // Exclude password
    });
    // Return array to match previous format expected by frontend [user] or null
    return user ? [user] : [];
};

const createUser = async (userData) => {
    const { name, password } = userData;
    if (!name || !password) {
        throw new Error('Name and password are required');
    }
    // ORM: Create
    const newUser = await User.create({ name, password });
    return newUser;
};

module.exports = {
    insertRandomUsers,
    getAllUsers,
    getUserById,
    createUser
};
