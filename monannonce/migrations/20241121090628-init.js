'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Création de la table Categorie
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    // Création de la table Utilisateur
    await queryInterface.createTable('Utilisateurs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      prenom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      motDePasse: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    // Création de la table Annonce
    await queryInterface.createTable('Annonces', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      prix: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      datePublication: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      statut: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'visible'
      },
      categorieId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      utilisateurId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Utilisateurs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    // Création de la table Signalement
    await queryInterface.createTable('Signalements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dateSignalement: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      typeSignalement: {
        type: Sequelize.ENUM('RECLAMATION', 'SPAM', 'AUTRE'),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      annonceId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Annonces',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      utilisateurId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Utilisateurs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Supprimer les tables dans l'ordre inverse des dépendances
    await queryInterface.dropTable('Signalements');
    await queryInterface.dropTable('Annonces');
    await queryInterface.dropTable('Utilisateurs');
    await queryInterface.dropTable('Categories');
  }
};
