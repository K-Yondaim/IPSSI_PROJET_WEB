const { pool } = require('../config/db');

const addComment = async (content) => {
    if (typeof content !== 'string') {
        // Handle case where body might be object: { content: "..." } or just "..." string (original used express.text and passed req.body directly)
        // Original: const comment = req.body; db.all(INSERT..., [comment])
        // If req.body was json object, this might have been weird.
        // I will assume content is passed.
        throw new Error('Invalid content');
    }
    await pool.execute('INSERT INTO comments (content) VALUES (?)', [content]);
    return { success: true };
};

const getAllComments = async () => {
    const [rows] = await pool.query('SELECT * FROM comments ORDER BY id DESC');
    return rows;
};

module.exports = {
    addComment,
    getAllComments
};
