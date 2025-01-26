const express = require('express');
const router = express.Router();
const { register, login, requestPasswordReset, resetPassword } = require('../services/authenticate');
const { serveFile } = require('../services/fileService');

router.post('/register', register);
router.post('/login', login);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);
router.get('/serve/:filename', serveFile);

module.exports = router;