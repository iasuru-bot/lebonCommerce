const express = require('express')
const router = express.Router()
const {validateUser} = require('../middleware/users')

// --- Routes pour les utilisateurs -------------------------------------

router.post('/register', (req, res) => {
    // Logique pour inscrire un utilisateur
    res.send('Créer un nouvel utilisateur');
});

router.post('/login', validateUser, (req, res) => {
    // Logique pour connecter un utilisateur
    res.send('Connexion utilisateur');
});

router.get('/:id', (req, res) => {
    // Logique pour récupérer un utilisateur spécifique
    res.send(`Récupérer l'utilisateur avec ID ${req.params.id}`);
});

router.patch('/:id', (req, res) => {
    // Logique pour mettre à jour un utilisateur
    res.send(`Mettre à jour l'utilisateur avec ID ${req.params.id}`);
});

router.get('/:id/annonces', (req, res) => {
    // Logique pour récupérer les annonces d'un utilisateur spécifique
    res.send(`Récupérer les annonces de l'utilisateur avec ID ${req.params.id}`);
});

module.exports = router