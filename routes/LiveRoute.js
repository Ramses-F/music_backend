const express = require('express');
const router = express.Router();
const Live = require('../controller/liveController');

// Define the routes
router.post('/registerLive', Live.addLive);
//router.post('/contact', Live.envoyerSms);
router.get('/liveLocation', Live.getAllLives);
router.get('/countLive', Live.countLives);

module.exports = router;
