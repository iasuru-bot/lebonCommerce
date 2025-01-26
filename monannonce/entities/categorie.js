const { DataTypes } = require('sequelize');


function init(sequelize) {
    const Categorie = sequelize.define('Categorie', {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Categorie;
}

module.exports = init;
