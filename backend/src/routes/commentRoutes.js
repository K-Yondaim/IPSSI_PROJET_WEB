const express = require('express');
const commentController = require('../controllers/commentController');

const router = express.Router();

router.post('/comment', commentController.addComment);
router.get('/comments', commentController.getComments);

module.exports = router;
