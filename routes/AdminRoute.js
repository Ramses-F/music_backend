const express = require('express');
const router = express.Router();
const Admin = require('../controller/adminController');

// Define the routes
router.post('/register', Admin.createAdmin);
router.post('/login', Admin.adminLogin);
router.get('/getAdmin', Admin.getAllAdmin);
router.get('/getAdminById/:adminId', Admin.getAdminById);

module.exports = router;
