const { Comment } = require('../models');

const addComment = async (content) => {
    if (typeof content !== 'string') {
        throw new Error('Invalid content');
    }
    // ORM: Create
    await Comment.create({ content });
    return { success: true };
};

const getAllComments = async () => {
    // ORM: findAll
    const comments = await Comment.findAll({
        order: [['id', 'DESC']]
    });
    return comments;
};

module.exports = {
    addComment,
    getAllComments
};
