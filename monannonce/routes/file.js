const express = require('express');
const router = express.Router();
const { uploadFile, serveFile } = require('../services/fileService');


router.post('/upload', uploadFile);
router.get('/serve/:filename', serveFile);

module.exports = router;