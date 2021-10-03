'use strict';

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

    await queryInterface.bulkInsert('addresses', wrap([
      { validator_id: 1, address: 'cosmos156gqf9837u7d4c4678yt3rl4ls9c5vuuxyhkw6' },
      { validator_id: 2, address: 'cosmos14lultfckehtszvzw4ehu0apvsr77afvyhgqhwh' },
      { validator_id: 3, address: 'cosmos19lss6zgdh5vvcpjhfftdghrpsw7a4434ut4md0' },
      { validator_id: 4, address: 'cosmos1a3yjj7d3qnx4spgvjcwjq9cw9snrrrhu3rw8nv' },
      { validator_id: 5, address: 'cosmos1sjllsnramtg3ewxqwwrwjxfgc4n4ef9u0tvx7u' },
      { validator_id: 6, address: 'cosmos1qaa9zej9a0ge3ugpx3pxyx602lxh3ztqda85ee' },
      { validator_id: 7, address: 'cosmos1nm0rrq86ucezaf8uj35pq9fpwr5r82cl8sc7p5' },
      { validator_id: 8, address: 'cosmos1v5y0tg0jllvxf5c3afml8s3awue0ymjuz3aksc' },
      { validator_id: 9, address: 'cosmos1ey69r37gfxvxg62sh4r0ktpuc46pzjrmz29g45' },
      { validator_id: 10, address: 'cosmos14k4pzckkre6uxxyd2lnhnpp8sngys9m6jtwwnd' }
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
