const userService = require('../services/userService');

const populateUsers = async (req, res) => {
    try {
        const result = await userService.insertRandomUsers();
        res.send(result.message);
    } catch (err) {
        res.status(500).send('Error populating users');
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).send('Database error');
    }
};

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const users = await userService.getUserById(id);
        res.json(users);
    } catch (err) {
        res.status(500).send('Database error');
    }
};

const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const legacyQuery = async (req, res) => {
    res.status(403).send("This endpoint has been disabled for security reasons.");
};

module.exports = {
    populateUsers,
    getUsers,
    getUserById,
    createUser,
    legacyQuery
};
