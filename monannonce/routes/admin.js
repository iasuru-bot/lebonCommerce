const express = require('express')
const router = express.Router()
const {body} = require('express-validator')


router.patch('/signalement/:id/statut', (req, res) => {
    // Logique pour mettre à jour le statut d'un signalement
    res.send(`Mettre à jour le statut du signalement avec ID ${req.params.id}`);
});
router.delete('/signalement/:id', (req, res) => {
    // Logique pour supprimer un signalement
    res.send(`Supprimer le signalement avec ID ${req.params.id}`);
});
router.delete('/user/:id', (req, res) => {
    // Logique pour supprimer un utilisateur
    res.send(`Supprimer l'utilisateur avec ID ${req.params.id}`);
});


module.exports = router