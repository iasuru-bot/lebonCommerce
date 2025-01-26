const { DataTypes } = require('sequelize');


function init(sequelize) {
    const Signalement = sequelize.define('Signalement', {
        dateSignalement: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        typeSignalement: {
            type: DataTypes.ENUM('RECLAMATION', 'SPAM', 'AUTRE'), // Exemple de types de signalement
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
    });
    return Signalement;
}

module.exports = init;