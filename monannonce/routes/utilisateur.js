const express = require('express')
const router = express.Router()
const {body, validationResult} = require('express-validator')
const utilisateurValidator = require('../middleware/utilisateur');
const handleValidationErrors = require('./help');
const { getAllUtilisateurs, getUtilisateurById, updateUtilisateur,getAnnoncesByIdUtilisateur} = require('../services/utilisateurs');

// --- Routes pour les utilisateurs -------------------------------------


router.get('/:id', getUtilisateurById);

router.patch('/:id',utilisateurValidator,handleValidationErrors,updateUtilisateur); 

router.get('/:id/annonces', getAnnoncesByIdUtilisateur);

router.get('/', getAllUtilisateurs);

module.exports = router