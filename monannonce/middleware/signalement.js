const { body } = require('express-validator');

const signalementValidator = [
    body('dateSignalement')
        .optional()
        .isISO8601().withMessage('La date de signalement doit être une date valide.'),
    body('message')
        .isString().withMessage('Le message doit être une chaîne de caractères.')
        .notEmpty().withMessage('Le message est obligatoire.'),
    body('typeSignalement')
        .isIn(['FRAUDE', 'SPAM', 'AUTRE']).withMessage('Le type de signalement doit être FRAUDE, SPAM ou AUTRE.')
        .notEmpty().withMessage('Le type de signalement est obligatoire.'),
    body('email')
        .isEmail().withMessage('L\'email doit être valide.')
        .notEmpty().withMessage('L\'email est obligatoire.'),
    body('annonceId')
        .isInt().withMessage('L\'ID de l\'annonce doit être un entier.')
        .notEmpty().withMessage('L\'ID de l\'annonce est obligatoire.'),
];

module.exports = signalementValidator;
