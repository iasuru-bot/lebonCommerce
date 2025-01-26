const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Utilisateur, sequelize } = require('../models');
const { mailer } = require('./mailer');
const crypto = require('crypto');


module.exports = {
    register,
    login,
    requestPasswordReset,
    resetPassword,
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
        const { motDePasse: _, ...userWithoutPassword } = utilisateur;

        return res.status(201).json({
            status: "Succès",
            utilisateur: userWithoutPassword
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
    try {
        const { email, motDePasse } = req.body;
        const utilisateur = await Utilisateur.findOne({ where: { email } });
        if (!utilisateur) return res.status(400).json({ status: "Incorrect", utilisateur: utilisateur });

        const isPasswordValid = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
        if (!isPasswordValid) return res.status(401).json({ status: "incorrect password" });

        const token = jwt.sign({ id: utilisateur.email }, 'secret-key');

        // Exclure le mot de passe de l'objet utilisateur avant de le renvoyer
        const { motDePasse: _, ...userWithoutPassword } = utilisateur.toJSON();

        return res.status(201).json({
            token,
            utilisateur: userWithoutPassword

        });
    } catch (error) {
        return res.status(400).json({
            status: "Erreur",
            message: error.message
        });
    }
}

//PAs terminé car comment réussir à faire les deep links
async function requestPasswordReset(req, res) {
    const { email } = req.body;
    const utilisateur = await Utilisateur.findOne({ where: { email } });

    let subject, text, html;

    if (!utilisateur) {
        subject = 'Réinitialisation de mot de passe demandée';
        text = `Bonjour,\n\nNous avons reçu une demande de réinitialisation de mot de passe pour cet email. Si vous n'avez pas de compte, vous pouvez en créer un ici : ${process.env.FRONTEND_URL}/SignUp\n\nCordialement,\nL'équipe Leboncommerce`;
        html = `<p>Bonjour,</p><p>Nous avons reçu une demande de réinitialisation de mot de passe pour cet email. Si vous n'avez pas de compte, vous pouvez en créer un ici : <a href="${process.env.FRONTEND_URL}/SignUp">Créer un compte</a></p><p>Cordialement,<br>L'équipe Leboncommerce</p>`;
    } else {
        const token = crypto.randomBytes(32).toString('hex');
        const resetToken = jwt.sign({ id: utilisateur.id, token }, 'secret-key', { expiresIn: '1h' });

        subject = 'Réinitialisation de mot de passe';
        text = `Bonjour,\n\nCliquez sur le lien suivant pour réinitialiser votre mot de passe : ${process.env.FRONTEND_URL}/ResetPassword?token=${resetToken}\n\nCordialement,\nL'équipe Leboncommerce`;
        html = `<p>Bonjour,</p><p>Cliquez sur le lien suivant pour réinitialiser votre mot de passe : <a href="${process.env.FRONTEND_URL}/ResetPassword?token=${resetToken}">Réinitialiser le mot de passe</a></p><p>Cordialement,<br>L'équipe Leboncommerce</p>`;
    }

    const from = '"Leboncommerce" <no-reply@leboncommerce.com>';
    const to = email;

    await mailer(from, to, subject, text, html);

    return res.status(200).json({ status: "Email de réinitialisation envoyé" });
}

async function resetPassword(req, res) {
    const { token, newPassword } = req.body;
    try {
        const decoded = jwt.verify(token, 'secret-key');
        const utilisateur = await Utilisateur.findByPk(decoded.id);
        if (!utilisateur) return res.status(400).json({ status: "Utilisateur non trouvé" });

        const hashedPassword = await bcrypt.hash(newPassword, 8);
        utilisateur.motDePasse = hashedPassword;
        await utilisateur.save();

        return res.status(200).json({ status: "Mot de passe réinitialisé avec succès" });
    } catch (error) {
        return res.status(400).json({ status: "Token invalide ou expiré" });
    }
}