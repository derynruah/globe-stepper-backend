const express = require('express');
const authController = require('../controllers/auth');
const { verifySignUp } = require('../middleware');

const router = express.Router();

router.post('/register', [verifySignUp.checkDuplicateEmail], authController.register);

router.post('/signin', authController.signIn);

module.exports = router;