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
    await queryInterface.bulkInsert('validators', wrap([
      { operator_address: 'cosmosvaloper156gqf9837u7d4c4678yt3rl4ls9c5vuursrrzf', moniker: 'Binance Staking', address: 'cosmos156gqf9837u7d4c4678yt3rl4ls9c5vuuxyhkw6' },
      { operator_address: 'cosmosvaloper14lultfckehtszvzw4ehu0apvsr77afvyju5zzy', moniker: 'DokiaCapital', address: 'cosmos14lultfckehtszvzw4ehu0apvsr77afvyhgqhwh' },
      { operator_address: 'cosmosvaloper19lss6zgdh5vvcpjhfftdghrpsw7a4434elpwpu', moniker: 'Paradigm', address: 'cosmos19lss6zgdh5vvcpjhfftdghrpsw7a4434ut4md0' },
      { operator_address: 'cosmosvaloper1a3yjj7d3qnx4spgvjcwjq9cw9snrrrhu5h6jll', moniker: 'Coinbase Custody', address: 'cosmos1a3yjj7d3qnx4spgvjcwjq9cw9snrrrhu3rw8nv' },
      { operator_address: 'cosmosvaloper1sjllsnramtg3ewxqwwrwjxfgc4n4ef9u2lcnj0', moniker: '🐠stake.fish', address: 'cosmos1sjllsnramtg3ewxqwwrwjxfgc4n4ef9u0tvx7u' },
      { operator_address: 'cosmosvaloper1qaa9zej9a0ge3ugpx3pxyx602lxh3ztqgfnp42', moniker: 'GAME', address: 'cosmos1qaa9zej9a0ge3ugpx3pxyx602lxh3ztqda85ee' },
      { operator_address: 'cosmosvaloper1nm0rrq86ucezaf8uj35pq9fpwr5r82clzyvtd8', moniker: 'Kraken', address: 'cosmos1nm0rrq86ucezaf8uj35pq9fpwr5r82cl8sc7p5' },
      { operator_address: 'cosmosvaloper1v5y0tg0jllvxf5c3afml8s3awue0ymju89frut', moniker: 'Zero Knowledge Validator (ZKV)', address: 'cosmos1v5y0tg0jllvxf5c3afml8s3awue0ymjuz3aksc' },
      { operator_address: 'cosmosvaloper1ey69r37gfxvxg62sh4r0ktpuc46pzjrm873ae8', moniker: 'Sikka', address: 'cosmos1ey69r37gfxvxg62sh4r0ktpuc46pzjrmz29g45' },
      { operator_address: 'cosmosvaloper14k4pzckkre6uxxyd2lnhnpp8sngys9m6hl6ml7', moniker: 'Polychain', address: 'cosmos14k4pzckkre6uxxyd2lnhnpp8sngys9m6jtwwnd' }
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
