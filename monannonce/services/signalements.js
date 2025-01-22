const { Signalement, Annonce , Utilisateur } = require("../models");
const { mailer } = require('./mailer');

module.exports = {
    getAllSignalements,
    createSignalement,
    getSignalementByUserId,
};

async function getAllSignalements(req, res, next) {
    try {
        const signalements = await Signalement.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        res.status(200).json(signalements);
    } catch (error) {
        next(error);
    }
}



async function createSignalement(req, res, next) {
    try {
        const { message, typeSignalement, email, annonceId } = req.body;

    
        const utilisateur = await Utilisateur.findOne({ where: { email: req.userEmail } });
        if (!utilisateur) {
            return res.status(404).json({ error: 'Utilisateur not found' });
        }

        const annonce = await Annonce.findByPk(annonceId);
        if (!annonce) {
            return res.status(404).json({ error: 'Annonce not found' });
        }

        const newSignalement = await Signalement.create({
            dateSignalement: new Date(),
            message,
            typeSignalement,
            email,
        });


        const emailSent = await mailer(
            '"Leboncommerce" <no-reply@leboncommerce.com>',
            email,
            'Confirmation de votre signalement',
            `Votre signalement a été reçu avec le message suivant : ${message}`,
            `<p>Votre signalement a été reçu avec le message suivant : ${message}</p>`
        );

        if (emailSent !== true) {
            return res.status(500).json({ error: 'Failed to send confirmation email' });
        }

        return res.status(201).json(newSignalement);
    } catch (error) {
        next(error);
    }
}

async function getSignalementByUserId(req, res, next) {
    try {
        const id_user = req.params.id_user;
        const signalement = await Signalement.findAll({ where: { utilisateurId: id_user } });
        if (signalement) {
            res.status(200).json(signalement);
        } else {
            res.status(404).json({ error: 'Signalement not found' });
        }
    } catch (error) {
        next(error);
    }
}