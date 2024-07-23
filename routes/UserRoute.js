const express = require('express');
const router = express.Router();
const User = require('../controller/UserController');

// Define the routes
router.post('/pay', User.pay);
router.post('/reserv', User.reserv);
router.get('/getAllpay', User.getAllPayments);
router.get('/getAllreserv', User.getAllReserv);
router.get('/countPay', User.countPayments);
router.get('/countRersv', User.countReserv);
router.get('/payByDate', User.sommeTotauxParDate);
router.get('/reservByDate', User.sommeReservParDate);
// router.get('/users/:id', User.getUsagerById);

module.exports = router;
