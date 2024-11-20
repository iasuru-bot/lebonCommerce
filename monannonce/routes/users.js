const express = require('express')
const router = express.Router()


// --- Routes pour les utilisateurs -------------------------------------

app.post('/register', (req, res) => {
    // Logique pour inscrire un utilisateur
    res.send('Créer un nouvel utilisateur');
});

app.post('/login', (req, res) => {
    // Logique pour connecter un utilisateur
    res.send('Connexion utilisateur');
});

app.get('/:id', (req, res) => {
    // Logique pour récupérer un utilisateur spécifique
    res.send(`Récupérer l'utilisateur avec ID ${req.params.id}`);
});

app.patch('/:id', (req, res) => {
    // Logique pour mettre à jour un utilisateur
    res.send(`Mettre à jour l'utilisateur avec ID ${req.params.id}`);
});

app.delete('/:id', (req, res) => {
    // Logique pour supprimer un utilisateur
    res.send(`Supprimer l'utilisateur avec ID ${req.params.id}`);
});
