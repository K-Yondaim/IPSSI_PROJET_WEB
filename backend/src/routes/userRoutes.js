const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/populate', userController.populateUsers);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.post('/user', userController.createUser);
// Keeping /query endpoint but backed by safe/disabled controller to satisfy "same structure" but secured
router.post('/query', userController.legacyQuery);

module.exports = router;
