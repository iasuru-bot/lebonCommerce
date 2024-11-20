const express = require('express')
const router = express.Router()

// --- Routes pour les signalements -------------------------------------

router.get('/', (req, res) => {
    // Logique pour récupérer tous les signalements
    res.send('Récupérer tous les signalements');
});

router.post('/', (req, res) => {
    // Logique pour créer un signalement
    res.send('Créer un nouveau signalement');
});

router.get('/:id_user', (req, res) => {
    // Logique pour récupérer un signalement spécifique
    res.send(`Récupérer le signalement avec ID d'un user${req.params.id}`);
});

router.patch('/:id/statut', (req, res) => {
    // Logique pour mettre à jour le statut d'un signalement
    res.send(`Mettre à jour le statut du signalement avec ID ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    // Logique pour supprimer un signalement
    res.send(`Supprimer le signalement avec ID ${req.params.id}`);
});


module.exports = router