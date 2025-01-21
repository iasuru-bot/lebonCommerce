const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const annonceValidator = require('../middleware/annonce');
const handleValidationErrors = require('./help');
const {
    searchAnnonces,
    getAllAnnonces,
    getAnnonceById,
    deleteAnnonce,
    getSignalementsByAnnonceId,
    updateAnnonce,
    createAnnonce
} = require('../services/annonces');

// --- Routes pour les annonces -------------------------------------

router.get('/', getAllAnnonces);

router.get('/chercher', searchAnnonces);

router.post('/', annonceValidator, handleValidationErrors, createAnnonce);

router.get('/:id', getAnnonceById);

router.patch('/:id', annonceValidator, handleValidationErrors, updateAnnonce);

router.delete('/:id', deleteAnnonce);

router.get('/:id/signalements', getSignalementsByAnnonceId);


module.exports = router