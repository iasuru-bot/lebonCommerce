const { Categorie } = require("../models");

module.exports = {
    getAllCategories,
};

async function getAllCategories(req, res, next) {
    try {
        const categories = await Categorie.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] } // Exclude specific attributes
        });
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
}