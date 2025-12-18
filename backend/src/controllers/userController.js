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

// Replaces the insecure /user and /query endpoints
const createUser = async (req, res) => {
    try {
        // If content-type is text/plain (unlikely given my app.use(json)), express might parse differently.
        // Supporting both JSON object and assuming maybe the body IS the param?
        // Let's assume standardized JSON {name, password}
        const user = await userService.createUser(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Fallback for the old raw query endpoint - blocking it
const legacyQuery = async (req, res) => {
    res.status(403).send("This endpoint has been disabled for security reasons.");
};

module.exports = {
    populateUsers,
    getUsers,
    createUser,
    legacyQuery
};
