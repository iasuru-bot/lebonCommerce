const { Signalement, Annonce , Utilisateur } = require("../models");

module.exports = {
    getAllSignalements,
    createSignalement,
    getSignalementByUserId,
};

async function getAllSignalements(req, res, next) {
    try {
        const signalements = await Signalement.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] } // Exclude specific attributes
        });
        res.status(200).json(signalements);
    } catch (error) {
        next(error);
    }
}

async function createSignalement(req, res, next) {
    try {
        const { message, typeSignalement, email, annonceId } = req.body;

        // Vérification de l'utilisateur
        const utilisateur = await Utilisateur.findOne({ where: { email: req.userEmail } });
        if (!utilisateur) {
            return res.status(404).json({ error: 'Utilisateur not found' });
        }

        // Vérification de l'annonce
        const annonce = await Annonce.findByPk(annonceId);
        if (!annonce) {
            return res.status(404).json({ error: 'Annonce not found' });
        }

        // Création du signalement
        const newSignalement = await Signalement.create({
            dateSignalement: new Date(),
            message,
            typeSignalement,
            email,
            AnnonceId: annonce.id,
            UtilisateurId: utilisateur.id
        });

        res.status(201).json(newSignalement);
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