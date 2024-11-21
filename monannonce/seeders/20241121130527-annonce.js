var faker = require('faker')
'use strict';

const randomElement = (array) => array[Math.floor(Math.random() * array.length)]; 
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   var dummyJSON = []
   const typesSignalement = ['Disponible', 'Indisponible'];
    for (var i = 0; i < 100; i++) {
      dummyJSON.push({
        titre: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        prix: parseFloat(faker.commerce.price()),
        statut: randomElement(typesSignalement),
        categorieId: faker.datatype.number({ min: 1, max: 10 }), 
        utilisateurId: faker.datatype.number({ min: 1, max: 20 }),
         datePublication: faker.date.past(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    await queryInterface.bulkInsert('Annonces', dummyJSON, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Annonces', null, {});
  }
};
