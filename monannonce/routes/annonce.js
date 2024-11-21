const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const annonceValidator = require('../middleware/annonce');
const handleValidationErrors = require('./help');

// --- Routes pour les annonces -------------------------------------

router.get('/', (req, res) => {
    // Logique pour récupérer toutes les annonces
    res.send('Récupérer toutes les annonces');
});

router.get('/chercher', (req, res) => {
    // Logique pour rechercher des annonces
    res.send('Récupérer des annonces par recherche');
});

router.post('/',annonceValidator, handleValidationErrors, (req, res) => {
    // Logique pour créer une annonce
    res.send('Créer une nouvelle annonce');
});

router.get('/:id', (req, res) => {
    // Logique pour récupérer une annonce spécifique
    res.send(`Récupérer l'annonce avec ID ${req.params.id}`);
});

router.patch('/:id',body("annonce").notEmpty(), (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400).send("Manque d'informations annonce");
    }

    // Logique pour mettre à jour une annonce
    res.send(`Mettre à jour l'annonce avec ID ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    // Logique pour supprimer une annonce
    res.send(`Supprimer l'annonce avec ID ${req.params.id}`);
});


router.get('/:id/signalements', (req, res) => {
    // Logique pour récupérer les signalements d'une annonce spécifique
    res.send(`Récupérer les signalements pour l'annonce avec ID ${req.params.id}`);
});


module.exports = router