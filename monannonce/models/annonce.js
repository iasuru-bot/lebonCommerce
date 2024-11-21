'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Annonce extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Categorie)
      this.hasMany(models.Signalement)
    }
  }
  Annonce.init({
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
  }
  }, {
    sequelize,
    modelName: 'Annonce',
  });
  return Annonce;
};