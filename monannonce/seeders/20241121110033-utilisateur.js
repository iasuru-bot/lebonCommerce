var faker = require('faker')
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    var dummyJSON = [];
    for (var i = 0; i < 100; i++) {
      dummyJSON.push({
        nom: faker.name.lastName(),
        prenom : faker.name.firstName(),
        email : faker.internet.email(),
        motDePasse: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    await queryInterface.bulkInsert('Utilisateurs', dummyJSON, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Utilisateurs', null, {});
  }
};
