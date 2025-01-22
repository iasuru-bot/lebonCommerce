const express = require('express');
const router = express.Router();
const { register, login, requestPasswordReset, resetPassword } = require('../services/authenticate');

router.post('/register', register);
router.post('/login', login);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);


module.exports = router;