const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
    updateSignalementStatus,
    deleteSignalement,
    deleteUser
} = require('../services/admin');

// --- Routes pour l'administration -------------------------------------

router.patch('/signalement/:id/statut', body('statut').notEmpty(), updateSignalementStatus);

router.delete('/signalement/:id', deleteSignalement);

router.delete('/user/:id', deleteUser);

module.exports = router;