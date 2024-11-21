var faker = require('faker')
'use strict';
// Fonction utilitaire pour sélectionner un élément aléatoire
const randomElement = (array) => array[Math.floor(Math.random() * array.length)];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const signalements = [];

    const typesSignalement = ['RECLAMATION', 'SPAM', 'AUTRE'];

    for (let i = 0; i < 50; i++) { 
      signalements.push({
        dateSignalement: faker.date.recent(),
        message: faker.lorem.sentence(),
        typeSignalement: randomElement(typesSignalement), // Sélectionne un type aléatoire
        annonceId: faker.datatype.number({ min: 1, max: 20 }), // Supposez que 20 annonces existent
        utilisateurId: faker.datatype.number({ min: 1, max: 10 }), // Supposez que 10 utilisateurs existent
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
