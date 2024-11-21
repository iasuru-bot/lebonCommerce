const { body } = require('express-validator');

const utilisateurValidator = [
    body('nom')
        .isString().withMessage('Le nom doit être une chaîne de caractères.')
        .notEmpty().withMessage('Le nom est obligatoire.'),
    body('prenom')
        .isString().withMessage('Le prénom doit être une chaîne de caractères.')
        .notEmpty().withMessage('Le prénom est obligatoire.'),
    body('email')
        .isEmail().withMessage('L\'email doit être valide.')
        .notEmpty().withMessage('L\'email est obligatoire.'),
    body('motDePasse')
        .isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères.')
        .notEmpty().withMessage('Le mot de passe est obligatoire.'),
    body('isAdmin')
        .optional()
        .isBoolean().withMessage('isAdmin doit être un booléen.'),
];

module.exports = utilisateurValidator;
