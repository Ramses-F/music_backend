const express = require('express');
const router = express.Router()

const User = require('../controller/UserController')

router.post('/register',User.registerUser),
router.post('/login',User.loginUser),
router.post('/forgot',User.resetPassword),
router.get('/users/:id',User.getUsagerById),

module.exports = router;