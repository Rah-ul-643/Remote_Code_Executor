const express = require('express');
const router = express.Router();

// Importing controllers and middlewares

const compileCode = require('../controllers/compilerController');

// route for compiling code
router.post('/compile',compileCode);
router.get('/validate',(req,res) => {
    res.json({ success: true});
})

module.exports = router;