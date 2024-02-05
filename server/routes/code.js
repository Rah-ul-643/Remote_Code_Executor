const express = require('express');
const router = express.Router();

// Importing controllers and middlewares

const compileCode = require('../controllers/compilerController');

// route for compiling code
router.post('/compile',compileCode);

module.exports = router;