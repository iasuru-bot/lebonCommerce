var faker = require('faker')
'use strict';
// Fonction utilitaire pour sélectionner un élément aléatoire
const randomElement = (array) => array[Math.floor(Math.random() * array.length)];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { Annonce, Utilisateur } = require('../models'); // Assurez-vous d'importer les modèles nécessaires

    const annonces = await Annonce.findAll({ attributes: ['id'] });
    const utilisateurs = await Utilisateur.findAll({ attributes: ['id'] });

    const annonceIds = annonces.map(a => a.id);
    const utilisateurIds = utilisateurs.map(u => u.id);

    const signalements = [];

    const typesSignalement = ['RECLAMATION', 'SPAM', 'AUTRE'];

    for (let i = 0; i < 50; i++) {
      signalements.push({
        dateSignalement: faker.date.recent(),
        message: faker.lorem.sentence(),
        typeSignalement: randomElement(typesSignalement), // Sélectionne un type aléatoire
        annonceId: randomElement(annonceIds), // Utilise un ID d'annonce valide
        utilisateurId: randomElement(utilisateurIds), // Utilise un ID d'utilisateur valide
        email: faker.internet.email(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Signalements', signalements, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Signalements', null, {});
  }
};