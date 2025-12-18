const commentService = require('../services/commentService');

const addComment = async (req, res) => {
    try {
        // Original logic: const comment = req.body;
        // If we use bodyParser.json(), req.body is an object.
        // If we use bodyParser.text(), req.body is string.
        // I configured both in app.js.
        // If client sends JSON { content: "text" }, req.body.content is safer.
        // If client sends raw text, req.body is string.

        let content = req.body;
        if (typeof content === 'object' && content.content) {
            content = content.content;
        }

        await commentService.addComment(content);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getComments = async (req, res) => {
    try {
        const comments = await commentService.getAllComments();
        res.json(comments);
    } catch (err) {
        res.status(500).send('Database error');
    }
};

module.exports = {
    addComment,
    getComments
};
