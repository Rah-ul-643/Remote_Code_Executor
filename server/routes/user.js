const express = require('express');
const router = express.Router();
const { loginController,registerController } = require('../controllers/userController');


// route for user registration
router.post('/register', registerController);

// route for user login
router.post('/login', loginController);

module.exports = router;