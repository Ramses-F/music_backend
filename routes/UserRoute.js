const express = require('express');
const router = express.Router()

const User = require('../controller/UserController')

router.post('/register',User.registerUser),
router.post('/verify',User.verifyCode),
router.post('/login',User.loginUser),
router.post('/forgot',User.resetPassword),
router.post('/pay',User.pay),
router.post('/reserv',User.reserv),
router.get('/users/:id',User.getUsagerById),

module.exports = router;