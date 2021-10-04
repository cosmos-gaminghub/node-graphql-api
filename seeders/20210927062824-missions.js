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
      { point: 10, name: 'Sign Genesis Block', detail: 'Validator node should be up when starting genesis.' },
      { point: 10, name: 'Share Seed Node', detail: 'Add your seed node info in this hackmd.' },
      { point: 10, name: 'Delegate', detail: 'Broadcast delegate tx to at least once.' },
      { point: 10, name: 'Vote', detail: 'Broadcast vote tx at least 3 times.' },
      { point: 10, name: 'IBC Transfer', detail: 'Broadcast IBC Transfer tx at least once.' },
      { point: 10, name: 'Upgrade Node', detail: 'Upgrade Node to the specific version and send new tx.' },
      { point: 20, name: 'No Jail', detail: 'Never jailed until from genesis to phase4 end.' },
      { point: 20, name: 'Double Sign Simulation', detail: 'Sign twice in the same hieght block and get jailed intentionally.' }
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
