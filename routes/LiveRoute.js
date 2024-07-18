const express = require('express');
const router = express.Router()

const Live = require('../controller/liveController')

router.post('/registerLive',Live.addLive),
router.get('/liveLocation',Live.getAllLives),
router.get('/countLive',Live.countLive),

module.exports = router;