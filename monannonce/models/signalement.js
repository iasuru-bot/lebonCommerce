'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Signalement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Utilisateur)
      this.belongsTo(models.Annonce)
    }
  }
  Signalement.init({
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
  }
  }, {
    sequelize,
    modelName: 'Signalement',
  });
  return Signalement;
};