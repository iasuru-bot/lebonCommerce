const { Utilisateur, Annonce } = require("../models")

module.exports = {
    getAllUtilisateurs,
    getUtilisateurById,
    updateUtilisateur,
    getAnnoncesByIdUtilisateur,
}

async function getAllUtilisateurs(req, res, next) {
    try {
        const utilisateurs = await Utilisateur.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt', 'motDePasse', 'isAdmin'] },
            where: {
                isAdmin: false 
            }
        });
        res.status(200).json(utilisateurs);
    } catch (error) {
        next(error);
    }
}

async function getUtilisateurById(req, res, next) {
    try {
        const id = req.params.id;
        const utilisateur = await Utilisateur.findByPk(id, {
            attributes: { exclude: ['createdAt', 'updatedAt', 'motDePasse', 'isAdmin'] },
            where: {
                isAdmin: false 
            }
        });
        res.status(200).json(utilisateur);
    } catch (error) {
        next(error);
    }
}

async function updateUtilisateur(req, res, next) {
    try {
        const { id } = req.params;
        const { nom, prenom, email, password } = req.body;

        // Vérification de l'utilisateur qui effectue la mise à jour
        const requestingUser = await Utilisateur.findOne({ where: { email: req.userEmail } });
        if (!requestingUser) {
            return res.status(404).json({ error: 'Requesting user not found' });
        }

        // Vérification de l'utilisateur à mettre à jour
        const utilisateur = await Utilisateur.findByPk(id);
        if (!utilisateur) {
            return res.status(404).json({ error: 'Utilisateur not found' });
        }

        // Vérification des permissions (seul un admin ou l'utilisateur lui-même peut mettre à jour)
        if (requestingUser.id !== utilisateur.id && !requestingUser.admin) {
            return res.status(403).json({ error: 'You do not have the necessary permissions' });
        }

        // Mise à jour de l'utilisateur
        const updatedUtilisateur = await Utilisateur.update(
            { nom, prenom, email, password },
            { where: { id } }
        );

        if (updatedUtilisateur[0] === 1) {
            res.status(201).json({
                Utilisateur: await Utilisateur.findByPk(id)
            });
        } else {
            res.status(404).json({ error: 'Utilisateur not found' });
        }
    } catch (error) {
        next(error);
    }
}


async function getAnnoncesByIdUtilisateur(req, res, next) {
    const id = req.params.id
    //check if the user has annonce associated with them
    const annonces = await Annonce.findAll({ where: { UtilisateurId: id } })
    if (annonces.length > 0) {
        res.status(201).json({ annonces })
    } else {
        res.status(404).json({ error: 'No annonces found' })
    }
}
