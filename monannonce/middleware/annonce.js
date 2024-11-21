const { body } = require('express-validator');

const annonceValidator = [
    body('titre')
        .isString().withMessage('Le titre doit être une chaîne de caractères.')
        .notEmpty().withMessage('Le titre est obligatoire.'),
    body('description')
        .isString().withMessage('La description doit être une chaîne de caractères.')
        .notEmpty().withMessage('La description est obligatoire.'),
    body('prix')
        .isFloat({ min: 0 }).withMessage('Le prix doit être un nombre positif.')
        .notEmpty().withMessage('Le prix est obligatoire.'),
    body('datePublication')
        .optional()
        .isISO8601().withMessage('La date de publication doit être une date valide.'),
    body('statut')
        .isString().withMessage('Le statut doit être une chaîne de caractères.')
        .notEmpty().withMessage('Le statut est obligatoire.'),
    body('categorieId')
        .isInt().withMessage('L\'ID de catégorie doit être un entier.')
        .notEmpty().withMessage('La catégorie est obligatoire.'),
];

module.exports = annonceValidator;
