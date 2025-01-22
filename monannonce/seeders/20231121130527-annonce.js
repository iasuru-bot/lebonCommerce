'use strict';

const faker = require('faker');
const { Categorie, Utilisateur } = require('../models'); // Assurez-vous d'importer les modèles nécessaires

const randomElement = (array) => array[Math.floor(Math.random() * array.length)];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = await Categorie.findAll({ attributes: ['id'] });
    const utilisateurs = await Utilisateur.findAll({ attributes: ['id'] });

    const categoryIds = categories.map(c => c.id);
    const utilisateurIds = utilisateurs.map(u => u.id);

    var dummyJSON = [];
    const typesSignalement = ['Disponible', 'Indisponible']; 
    const filePaths = [
      'uploads/image1.jpg',
      'uploads/image2.jpg',
      'uploads/image3.jpg',
      'uploads/image4.jpg',
      'uploads/image5.jpg',
    ];

    for (var i = 0; i < 100; i++) {
      dummyJSON.push({
        titre: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        prix: parseFloat(faker.commerce.price()),
        statut: randomElement(typesSignalement),
        categorieId: randomElement(categoryIds),
        utilisateurId: randomElement(utilisateurIds),
        datePublication: faker.date.past(),
        filePath:randomElement(filePaths),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Annonces', dummyJSON, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Annonces', null, {});
  }
};