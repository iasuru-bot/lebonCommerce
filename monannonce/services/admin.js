const { Signalement, Utilisateur, Annonce } = require("../models");

module.exports = {
    updateSignalementStatus,
    deleteSignalement,
    deleteUser,
};

//encore en cours car pas de statut prevu en bdd encore
async function updateSignalementStatus(req, res, next) {
    try {
        const user = await Utilisateur.findOne({ where: { email: req.userEmail } });
        if (!user || !user.isAdmin) {
            return res.status(403).json({ error: 'You do not have the necessary permissions' });
        }

        const id = req.params.id;
        const { statut } = req.body;
        const [updated] = await Signalement.update({ statut }, { where: { id } });
        if (updated) {
            const updatedSignalement = await Signalement.findByPk(id);
            res.status(200).json(updatedSignalement);
        } else {
            res.status(404).json({ error: 'Signalement not found' });
        }
    } catch (error) {
        next(error);
    }
}

async function deleteSignalement(req, res, next) {
    try {
        const user = await Utilisateur.findOne({ where: { email: req.userEmail } });
        if (!user || !user.isAdmin) {
            return res.status(403).json({ error: 'You do not have the necessary permissions' });
        }

        const id = req.params.id;
        const deleted = await Signalement.destroy({ where: { id } });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Signalement not found' });
        }
    } catch (error) {
        next(error);
    }
}

async function deleteUser(req, res, next) {
    try {
        const user = await Utilisateur.findOne({ where: { email: req.userEmail } });
        if (!user || !user.isAdmin) {
            return res.status(403).json({ error: 'You do not have the necessary permissions' });
        }

        const id = req.params.id;

        // Delete all annonces related to the user
        await Annonce.destroy({ where: { UtilisateurId: id } });

        // Delete the user
        const deleted = await Utilisateur.destroy({ where: { id } });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Utilisateur not found' });
        }
    } catch (error) {
        next(error);
    }
}