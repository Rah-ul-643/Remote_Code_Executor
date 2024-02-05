const express = require('express');
const router = express.Router();

// Importing controllers and middlewares

const {loginUser}= require('../controllers/authentication');
const {registerUser,sendOtp}= require('../controllers/registration');

// route for sending otp
router.post('/sendotp',sendOtp);

// route for user registration
router.post('/register',registerUser);

// route for user login
router.post('/login',loginUser);

module.exports = router;