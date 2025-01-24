const { Annonce, Utilisateur, Signalement, Categorie } = require("../models");
const { Op } = require("sequelize");

module.exports = {
    getAllAnnonces,
    searchAnnonces,
    createAnnonce,
    getAnnonceById,
    updateAnnonce,
    deleteAnnonce,
    getSignalementsByAnnonceId,
};

async function getAllAnnonces(req, res, next) {
    try {
        const annonces = await Annonce.findAll({
            attributes: { exclude: ['CategorieId', 'createdAt', 'updatedAt', 'UtilisateurId'] }, // Exclude specific attributes
            include: [
                {
                    model: Categorie,
                    attributes: ['nom'] // Include only the category name
                },
                {
                    model: Utilisateur,
                    attributes: ['nom', 'prenom'] // Include only the user name and email
                }
            ],
            limit: 100
        });
        res.status(200).json(annonces);
    } catch (error) {
        next(error);
    }
}

async function searchAnnonces(req, res, next) {
    try {
        const { query } = req.query;
        const annonces = await Annonce.findAll({
            attributes: { exclude: ['CategorieId', 'createdAt', 'updatedAt', 'UtilisateurId'] }, // Exclude specific attributes
            where: {
                titre: {
                    [Op.like]: `%${query}%`
                }
            },
            include: [
                {
                    model: Utilisateur,
                    attributes: ['nom', 'prenom']
                },
                {
                    model: Categorie,
                    attributes: ['nom']
                }
            ]
        });
        res.status(200).json(annonces);
    } catch (error) {
        next(error);
    }
}

async function createAnnonce(req, res, next) {
    try {
        const { titre, description, prix, categorieId } = req.body;

        // Vérification de l'utilisateur
        const utilisateur = await Utilisateur.findOne({ where: { email: req.userEmail } });
        if (!utilisateur) {
            return res.status(404).json({ error: 'Utilisateur not found' });
        }

        // Vérification de la catégorie
        const categorie = await Categorie.findByPk(categorieId);
        if (!categorie) {
            return res.status(404).json({ error: 'Categorie not found' });
        }

        // Création de l'annonce
        const newAnnonce = await Annonce.create({
            titre,
            description,
            prix,
            datePublication: new Date(),
            statut: 'disponible',
            CategorieId: categorieId,
            UtilisateurId: utilisateur.id,
            filePath,
        });

        res.status(201).json(newAnnonce);
    } catch (error) {
        next(error);
    }
}


async function getAnnonceById(req, res, next) {
    try {
        const annonce = await Annonce.findByPk(req.params.id, {
            attributes: { exclude: ['CategorieId', 'createdAt', 'updatedAt', 'UtilisateurId'] }, // Exclude specific attributes
            include: [
                {
                    model: Utilisateur,
                    attributes: ['nom', 'prenom']
                },
                {
                    model: Categorie,
                    attributes: ['nom']
                }
            ]
        });
        if (annonce) {
            res.status(200).json(annonce);
        } else {
            res.status(404).json({ message: 'Annonce not found' });
        }
    } catch (error) {
        next(error);
    }
}

async function updateAnnonce(req, res, next) {
    try {
        const { id } = req.params;
        const { titre, description, prix, statut, categorieId } = req.body;

        // Vérification de l'annonce
        const annonce = await Annonce.findByPk(id);
        if (!annonce) {
            return res.status(404).json({ error: 'Annonce not found' });
        }

        // Vérification de l'utilisateur
        const user = await Utilisateur.findOne({ where: { email: req.userEmail } });
        if (!user || annonce.UtilisateurId !== user.id) {
            return res.status(403).json({ error: 'You do not have the necessary permissions' });
        }

        // Vérification de la catégorie
        const categorie = await Categorie.findByPk(categorieId);
        if (!categorie) {
            return res.status(404).json({ error: 'Categorie not found' });
        }

        // Mise à jour de l'annonce
        const [updated] = await Annonce.update(
            { titre, description, prix, statut, CategorieId: categorieId, UtilisateurId: user.id },
            { where: { id } }
        );

        if (updated) {
            const updatedAnnonce = await Annonce.findByPk(id);
            res.status(200).json(updatedAnnonce);
        } else {
            res.status(404).json({ error: 'Annonce not found' });
        }
    } catch (error) {
        next(error);
    }
}
async function deleteAnnonce(req, res, next) {
    try {
        const id = req.params.id;
        const annonce = await Annonce.findByPk(id);
        if (!annonce) {
            return res.status(404).json({ error: 'Annonce not found' });
        }

        const user = await Utilisateur.findOne({ where: { email: req.userEmail } });

        if (!user || annonce.UtilisateurId !== user.id) {
            return res.status(403).json({ error: 'You do not have the necessary permissions' });
        }

        const deleted = await Annonce.destroy({ where: { id } });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Annonce not found' });
        }
    } catch (error) {
        next(error);
    }
}

async function getSignalementsByAnnonceId(req, res, next) {
    try {
        const { id } = req.params;
        const signalements = await Signalement.findAll({
            where: { annonceId: id },
            attributes: { exclude: ['createdAt', 'updatedAt', 'AnnonceId', 'UtilisateurId'] }, // Exclude specific attributes
            include: [
                {
                    model: Utilisateur,
                    attributes: ['nom', 'prenom']
                }
            ]
        });
        res.status(200).json(signalements);
    } catch (error) {
        next(error);
    }
}