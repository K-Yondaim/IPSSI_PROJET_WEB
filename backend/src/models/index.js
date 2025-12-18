const sequelize = require('../config/sequelize');
const User = require('./User');
const Comment = require('./Comment');

// Sync all models with database
// In production, use migrations instead of sync({ alter: true })
const initModels = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to MySQL via Sequelize established successfully.');
        await sequelize.sync({ alter: true });
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = {
    sequelize,
    initModels,
    User,
    Comment
};
