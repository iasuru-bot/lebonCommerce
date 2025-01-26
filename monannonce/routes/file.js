const express = require('express');
const router = express.Router();
const { uploadFiles } = require('../services/fileService');

router.post('/upload', uploadFiles);

module.exports = router;