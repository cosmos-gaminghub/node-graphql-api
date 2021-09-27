const Sequelize = require('sequelize')

/**
 * Actions summary:
 *
 * createTable() => "addresses", deps: []
 * createTable() => "missions", deps: []
 * createTable() => "point_histories", deps: []
 * createTable() => "txs", deps: []
 * createTable() => "tx_types", deps: []
 * createTable() => "validators", deps: []
 * addIndex(hash_UNIQUE) => "txs"
 * addIndex(hash_UNIQUE) => "validators"
 *
 */

const info = {
  revision: 1,
  name: 'inits',
  created: '2021-09-27T06:12:52.624Z',
  comment: ''
}

const migrationCommands = (transaction) => [
  {
    fn: 'createTable',
    params: [
      'addresses',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          allowNull: false,
          primaryKey: true
        },
        validator_id: { type: Sequelize.INTEGER, field: 'validator_id' },
        address: { type: Sequelize.STRING(191), field: 'address' },
        createdAt: {
          type: Sequelize.DATE,
          field: 'created_at',
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: 'updated_at',
          allowNull: false
        }
      },
      { transaction }
    ]
  },
  {
    fn: 'createTable',
    params: [
      'missions',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          allowNull: false,
          primaryKey: true
        },
        point: { type: Sequelize.INTEGER, field: 'point' },
        detail: { type: Sequelize.TEXT, field: 'detail' },
        createdAt: {
          type: Sequelize.DATE,
          field: 'created_at',
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: 'updated_at',
          allowNull: false
        }
      },
      { transaction }
    ]
  },
  {
    fn: 'createTable',
    params: [
      'point_histories',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          allowNull: false,
          primaryKey: true
        },
        validator_id: { type: Sequelize.INTEGER, field: 'validator_id' },
        mission_id: { type: Sequelize.INTEGER, field: 'mission_id' },
        point: { type: Sequelize.INTEGER, field: 'point' },
        createdAt: {
          type: Sequelize.DATE,
          field: 'created_at',
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: 'updated_at',
          allowNull: false
        }
      },
      { transaction }
    ]
  },
  {
    fn: 'createTable',
    params: [
      'txs',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          allowNull: false,
          primaryKey: true
        },
        hash: { type: Sequelize.STRING(191), field: 'hash' },
        sender: { type: Sequelize.STRING(191), field: 'sender' },
        type: { type: Sequelize.INTEGER, field: 'type' },
        detail: { type: Sequelize.TEXT, field: 'detail' },
        confirmed_at: { type: Sequelize.DATE, field: 'confirmed_at' },
        createdAt: {
          type: Sequelize.DATE,
          field: 'created_at',
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: 'updated_at',
          allowNull: false
        }
      },
      { transaction }
    ]
  },
  {
    fn: 'createTable',
    params: [
      'tx_types',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          allowNull: false,
          primaryKey: true
        },
        name: { type: Sequelize.STRING(191), field: 'name' },
        createdAt: {
          type: Sequelize.DATE,
          field: 'created_at',
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: 'updated_at',
          allowNull: false
        }
      },
      { transaction }
    ]
  },
  {
    fn: 'createTable',
    params: [
      'validators',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          allowNull: false,
          primaryKey: true
        },
        operator_address: {
          type: Sequelize.STRING(191),
          field: 'operator_address'
        },
        moniker: { type: Sequelize.STRING(191), field: 'moniker' },
        createdAt: {
          type: Sequelize.DATE,
          field: 'created_at',
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: 'updated_at',
          allowNull: false
        }
      },
      { transaction }
    ]
  },
  {
    fn: 'addIndex',
    params: [
      'txs',
      ['hash'],
      {
        indexName: 'hash_UNIQUE',
        name: 'hash_UNIQUE',
        indicesType: 'UNIQUE',
        type: 'UNIQUE',
        transaction
      }
    ]
  },
  {
    fn: 'addIndex',
    params: [
      'validators',
      ['operator_address'],
      {
        indexName: 'hash_UNIQUE',
        name: 'hash_UNIQUE',
        indicesType: 'UNIQUE',
        type: 'UNIQUE',
        transaction
      }
    ]
  }
]

const rollbackCommands = (transaction) => [
  {
    fn: 'dropTable',
    params: ['addresses', { transaction }]
  },
  {
    fn: 'dropTable',
    params: ['missions', { transaction }]
  },
  {
    fn: 'dropTable',
    params: ['point_histories', { transaction }]
  },
  {
    fn: 'dropTable',
    params: ['txs', { transaction }]
  },
  {
    fn: 'dropTable',
    params: ['tx_types', { transaction }]
  },
  {
    fn: 'dropTable',
    params: ['validators', { transaction }]
  }
]

const pos = 0
const useTransaction = true

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos
  const run = (transaction) => {
    const commands = _commands(transaction)
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index]
          console.log(`[#${index}] execute: ${command.fn}`)
          index++
          queryInterface[command.fn](...command.params).then(next, reject)
        } else resolve()
      }
      next()
    })
  }
  if (useTransaction) return queryInterface.sequelize.transaction(run)
  return run(null)
}

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info
}
