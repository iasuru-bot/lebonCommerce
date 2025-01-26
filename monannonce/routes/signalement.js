const express = require('express');
const router = express.Router();
const signalementValidator = require('../middleware/signalement');
const handleValidationErrors = require('./help');
const {
    getAllSignalements,
    createSignalement,
    getSignalementByUserId
} = require('../services/signalements');

// --- Routes pour les signalements -------------------------------------

router.get('/', getAllSignalements);

router.post('/', signalementValidator, handleValidationErrors, createSignalement);

router.get('/:id_user', getSignalementByUserId);

module.exports = router