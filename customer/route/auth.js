const { register, verifyEmail } = require('../controller/authController');

const router = require('express').Router();

router.post("/register", register)
router.post('/verify/:token',  verifyEmail);

module.exports = router