const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Utilisateur, sequelize } = require('../models');
const { mailer } = require('./mailer');

module.exports = {
    register,
    login,
};


async function register(req, res, next) {
    const transaction = await sequelize.transaction();

    try {
        const { nom, prenom, email, motDePasse } = req.body;
        const hashedPassword = await bcrypt.hash(motDePasse, 8);
        const utilisateur = await Utilisateur.create({
            nom,
            prenom,
            email,
            motDePasse: hashedPassword
        }, { transaction });
        await transaction.commit();

        const from = '"Leboncommerce" <no-reply@leboncommerce.com>';
        const to = email;
        const subject = 'Bienvenue sur Leboncommerce';
        const text = `Bonjour ${prenom},\n\nMerci de vous être inscrit sur Leboncommerce !\n\nCordialement,\nL'équipe Leboncommerce`;
        const html = `<p>Bonjour ${prenom},</p><p>Merci de vous être inscrit sur Leboncommerce !</p><p>Cordialement,<br>L'équipe Leboncommerce</p>`;

        await mailer(from, to, subject, text, html);

        return res.status(201).json({
            status: "Succès",
            utilisateur: utilisateur
        });
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({
            status: "Erreur",
            message: error.message
        });
    }
}


async function login(req, res) {
    const transaction = await sequelize.transaction();

    try {
        const { email, motDePasse } = req.body;
        const utilisateur = await Utilisateur.findOne({ where: { email } });
        if (!utilisateur) return res.status(400).json({ status: "Incorrect", utilisateur: utilisateur });

        const isPasswordValid = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
        if (!isPasswordValid) return res.status(401).json({ status: "incorrect password" });

        const token = jwt.sign({ id: utilisateur.email }, 'secret-key');

        return res.status(201).json({
            token,
            utilisateur
        });
    } catch (error) {
        return res.status(400).json({
            status: "Erreur",
            message: error.message
        });
    }
}