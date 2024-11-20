const express = require('express')
const router = express.Router()

// --- Routes pour les catégories -------------------------------------

router.get('/', (req, res) => {
    // Logique pour récupérer toutes les catégories
    res.send('Récupérer toutes les catégories');
});


module.exports = router