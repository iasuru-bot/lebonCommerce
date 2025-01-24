const express = require('express');
const router = express.Router();
const { uploadFile } = require('../services/fileService');

router.post('/upload', uploadFile);

module.exports = router;