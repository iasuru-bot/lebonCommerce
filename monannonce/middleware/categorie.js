const { body } = require('express-validator');

const categorieValidator = [
    body('nom')
        .isString().withMessage('Le nom doit être une chaîne de caractères.')
        .notEmpty().withMessage('Le nom est obligatoire.'),
];

module.exports = categorieValidator;
