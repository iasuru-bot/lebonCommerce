var faker = require('faker')
'use strict';

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
   var dummyJSON = new Set();
    while (dummyJSON.size < 20) {
      dummyJSON.add(faker.commerce.department(),
      )
    }
    // Transformer en tableau d'objets Sequelize
    const categories = Array.from(dummyJSON).map((nom) => ({
      nom: nom,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Categories', categories, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
