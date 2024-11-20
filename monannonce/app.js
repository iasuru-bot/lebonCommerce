const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const initRoutes = require('./routes')

initRoutes(app)

app.use(bodyParser.json());

// --- Routes pour les catégories -------------------------------------

app.get('/categories', (req, res) => {
    // Logique pour récupérer toutes les catégories
    res.send('Récupérer toutes les catégories');
});



// --- Routes pour les annonces -------------------------------------

app.get('/annonces', (req, res) => {
    // Logique pour récupérer toutes les annonces
    res.send('Récupérer toutes les annonces');
});

app.get('/annonces/chercher', (req, res) => {
    // Logique pour rechercher des annonces
    res.send('Récupérer des annonces par recherche');
});

app.post('/annonces', (req, res) => {
    // Logique pour créer une annonce
    res.send('Créer une nouvelle annonce');
});

app.get('/annonces/:id', (req, res) => {
    // Logique pour récupérer une annonce spécifique
    res.send(`Récupérer l'annonce avec ID ${req.params.id}`);
});

app.patch('/annonces/:id', (req, res) => {
    // Logique pour mettre à jour une annonce
    res.send(`Mettre à jour l'annonce avec ID ${req.params.id}`);
});

app.delete('/annonces/:id', (req, res) => {
    // Logique pour supprimer une annonce
    res.send(`Supprimer l'annonce avec ID ${req.params.id}`);
});

app.get('/utilisateurs/:id/annonces', (req, res) => {
    // Logique pour récupérer les annonces d'un utilisateur spécifique
    res.send(`Récupérer les annonces de l'utilisateur avec ID ${req.params.id}`);
});

// --- Routes pour les signalements -------------------------------------

app.get('/signalements', (req, res) => {
    // Logique pour récupérer tous les signalements
    res.send('Récupérer tous les signalements');
});

app.post('/signalements', (req, res) => {
    // Logique pour créer un signalement
    res.send('Créer un nouveau signalement');
});

app.get('/signalements/:id_user', (req, res) => {
    // Logique pour récupérer un signalement spécifique
    res.send(`Récupérer le signalement avec ID d'un user${req.params.id}`);
});

app.patch('/signalements/:id/statut', (req, res) => {
    // Logique pour mettre à jour le statut d'un signalement
    res.send(`Mettre à jour le statut du signalement avec ID ${req.params.id}`);
});

app.delete('/signalements/:id', (req, res) => {
    // Logique pour supprimer un signalement
    res.send(`Supprimer le signalement avec ID ${req.params.id}`);
});

app.get('/annonces/:id/signalements', (req, res) => {
    // Logique pour récupérer les signalements d'une annonce spécifique
    res.send(`Récupérer les signalements pour l'annonce avec ID ${req.params.id}`);
});


app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});
