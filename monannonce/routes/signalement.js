const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const signalementValidator = require('../middleware/signalement');
const handleValidationErrors = require('./help');

// --- Routes pour les signalements -------------------------------------

router.get('/', (req, res) => {
    // Logique pour récupérer tous les signalements
    res.send('Récupérer tous les signalements');
});

router.post('/',signalementValidator,handleValidationErrors, (req, res) => {
    // Logique pour créer un signalement
    res.send('Créer un nouveau signalement');
});

router.get('/:id_user', (req, res) => {
    // Logique pour récupérer un signalement spécifique
    res.send(`Récupérer le signalement avec ID d'un user${req.params.id}`);
});

module.exports = router