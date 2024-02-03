const { register, verifyEmail, authLogin } = require('../controller/authController');

const router = require('express').Router();

router.post("/register", register)
router.post('/verify/:token',  verifyEmail);
router.post('/login',  authLogin);

module.exports = router