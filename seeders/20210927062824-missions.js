'use strict'

const wrap = require('../db/utils/wrapValuesWithDateTime.js')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('missions', wrap([
      { point: 10, detail: 'Sign Genesis Block' },
      { point: 10, detail: 'Share Seed Node' },
      { point: 10, detail: 'Delegate' },
      { point: 10, detail: 'Vote' },
      { point: 10, detail: 'IBC Transfer' },
      { point: 10, detail: 'Upgrade Node' },
      { point: 20, detail: 'No Jail' },
      { point: 20, detail: 'Double Sign Simulation' }
    ]), {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
}
