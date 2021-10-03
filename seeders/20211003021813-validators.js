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
    await queryInterface.bulkInsert('validators', wrap([
      { operator_address: 'cosmosvaloper156gqf9837u7d4c4678yt3rl4ls9c5vuursrrzf', moniker: 'Binance Staking' },
      { operator_address: 'cosmos14lultfckehtszvzw4ehu0apvsr77afvyhgqhwh', moniker: 'DokiaCapital' },
      { operator_address: 'cosmosvaloper19lss6zgdh5vvcpjhfftdghrpsw7a4434elpwpu', moniker: 'Paradigm' },
      { operator_address: 'cosmosvaloper1a3yjj7d3qnx4spgvjcwjq9cw9snrrrhu5h6jll', moniker: 'Coinbase Custody' },
      { operator_address: 'cosmosvaloper1sjllsnramtg3ewxqwwrwjxfgc4n4ef9u2lcnj0', moniker: '🐠stake.fish' },
      { operator_address: 'cosmosvaloper1qaa9zej9a0ge3ugpx3pxyx602lxh3ztqgfnp42', moniker: 'GAME' },
      { operator_address: 'cosmosvaloper1nm0rrq86ucezaf8uj35pq9fpwr5r82clzyvtd8', moniker: 'Kraken' },
      { operator_address: 'cosmosvaloper1v5y0tg0jllvxf5c3afml8s3awue0ymju89frut', moniker: 'Zero Knowledge Validator (ZKV)' },
      { operator_address: 'cosmosvaloper1ey69r37gfxvxg62sh4r0ktpuc46pzjrm873ae8', moniker: 'Sikka' },
      { operator_address: 'cosmosvaloper14k4pzckkre6uxxyd2lnhnpp8sngys9m6hl6ml7', moniker: 'Polychain' }
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
