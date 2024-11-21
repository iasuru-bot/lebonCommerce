const { DataTypes } = require('sequelize');

function init(sequelize) {
    const Annonce = sequelize.define('Annonce', {
        titre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        prix: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        datePublication: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        statut: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'visible',
        },
    });
    return Annonce
}

module.exports = init;

