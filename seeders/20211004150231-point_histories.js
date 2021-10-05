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
    await queryInterface.bulkInsert('point_histories', wrap([
      { validator_id: 1, mission_id: 1 },
      { validator_id: 1, mission_id: 2 },
      { validator_id: 1, mission_id: 3 },
      { validator_id: 2, mission_id: 1 },
      { validator_id: 2, mission_id: 2 },
      { validator_id: 2, mission_id: 3 }
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
