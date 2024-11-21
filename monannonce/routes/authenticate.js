const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { Utilisateur, sequelize } = require('../models');
const { tr } = require('faker/lib/locales');
const jwt = require('jsonwebtoken')


router.post('/register', async (req, res, next) => {
    const transaction = await sequelize.transaction();

    try {

        const { nom, prenom, email, motDePasse } = req.body;
        const hashedPassword = await bcrypt.hash(motDePasse, 8);
        const utilisateur = await Utilisateur.create({
            nom,
            prenom,
            email,
            motDePasse: hashedPassword
        }, {transaction})
        transaction.commit();
        return res.status(201).json({
            status : "Succès",
            utilisateur: utilisateur
        })
        
    } catch (error) {
        transaction.rollback()
        return res.status(400).json({
            status : "Erreur",
            message : error.message
        })
    }
});

router.post('/login', async (req, res) => {
    const transaction = await sequelize.transaction();

    try {

        const {email, motDePasse } = req.body;

        const utilisateur = await Utilisateur.findOne({where : {email}});
        if(!utilisateur)return res.status(400).json({status : "Incorrect", utilisateur: utilisateur})

        const isPasswordValid = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
        if(!isPasswordValid) return res.status(401).json({status: "incorrect password"})
        
        const token = jwt.sign({id : utilisateur.email}, 'secret-key')

        return res.status(201).json({
            token,
            utilisateur
        })
    } catch (error) {
        console.lo
        return res.status(400).json({
            status : "Erreur",
            message : error.message
        })
    }
  });

module.exports = router