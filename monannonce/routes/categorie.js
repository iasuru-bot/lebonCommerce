const express = require('express')
const router = express.Router()
const {
    getAllCategories
} = require('../services/categories');
// --- Routes pour les catégories -------------------------------------

router.get('/', getAllCategories);

module.exports = router