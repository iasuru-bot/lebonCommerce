const { Utilisateur, Annonce } = require("../models")

module.exports = {
    getAllUtilisateurs,
    getUtilisateurById,
    updateUtilisateur,
    deleteUtilisateur,
    getAnnoncesByIdUtilisateur,
}

async function getAllUtilisateurs(req, res, next) {
    res.status(201).json({
        Utilisateur: await Utilisateur.findAll()
    })
}

async function getUtilisateurById(req, res, next) {
    const id = req.params.id
    res.status(201).json({
        Utilisateur: await Utilisateur.findByPk(id)
    })
}

async function updateUtilisateur(req, res, next) {
    //verify that the jwt token is for the user who we are updating
    const id = req.params.id
    const { nom, prenom, email, password } = req.body
    const updatedUtilisateur = await Utilisateur.update({ nom, prenom, email, password }, { where: { id } })
    if (updatedUtilisateur[0] === 1) {
        res.status(201).json({
            Utilisateur: await Utilisateur.findByPk(id)
        })
    } else {
        res.status(404).json({ error: 'Utilisateur not found' })
    }
}
async function deleteUtilisateur(req, res, next) {
    //verify that the jwt token is for an admin user
    const id = req.params.id

    //check if the user exists and is an admin
    //A corriger car il faut recup l'email du token
    const user = await Utilisateur.findByPk(id)
    if (user && user.admin) {
        const deletedUtilisateur = await Utilisateur.destroy({ where: { id } })
        if (deletedUtilisateur === 1) {
            res.status(204).end()
        } else {
            res.status(404).json({ error: 'Utilisateur not found' })
        }
    } else {
        res.status(403).json({ error: 'You do not have the necessary permissions' })
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
