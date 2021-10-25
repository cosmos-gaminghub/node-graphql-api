const Sequelize = require('sequelize')

/**
 * Actions summary:
 *
 * createTable() => "blocks", deps: []
 * createTable() => "missed_blocks", deps: []
 * createTable() => "missions", deps: []
 * createTable() => "point_histories", deps: []
 * createTable() => "slashing_events", deps: []
 * createTable() => "txs", deps: []
 * createTable() => "validators", deps: []
 * addIndex(height_UNIQUE) => "blocks"
 * addIndex(unique_missed_blocks_address_height) => "missed_blocks"
 * addIndex(missed_blocks_consensus_address_indexes) => "missed_blocks"
 * addIndex(validator_id_mission_id_unique) => "point_histories"
 * addIndex(validator_id_indexes) => "point_histories"
 * addIndex(slashing_evenrts_address_height) => "slashing_events"
 * addIndex(slashing_events_consensus_address_indexes) => "slashing_events"
 * addIndex(action_indexes) => "txs"
 * addIndex(sender_indexes) => "txs"
 * addIndex(hash_UNIQUE) => "txs"
 * addIndex(operator_address_UNIQUE) => "validators"
 *
 */

const info = {
  revision: 1,
  name: 'inits',
  created: '2021-10-25T07:24:21.591Z',
  comment: ''
}

const migrationCommands = (transaction) => [
  {
    fn: 'createTable',
    params: [
      'blocks',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          autoIncrement: true,
          primaryKey: true
        },
        height: { type: Sequelize.INTEGER, field: 'height' },
        proposer: { type: Sequelize.STRING(191), field: 'proposer' },
        blockHash: { type: Sequelize.STRING(191), field: 'block_hash' },
        numTxs: { type: Sequelize.INTEGER, field: 'num_txs' },
        timestamp: { type: Sequelize.DATE, field: 'timestamp' },
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
      'missed_blocks',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          autoIncrement: true,
          primaryKey: true
        },
        height: { type: Sequelize.INTEGER, field: 'height' },
        consensusAddress: {
          type: Sequelize.STRING(191),
          field: 'consensus_address'
        },
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
          autoIncrement: true,
          primaryKey: true
        },
        name: { type: Sequelize.STRING(191), field: 'name' },
        detail: { type: Sequelize.STRING(191), field: 'detail' },
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
      'point_histories',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          autoIncrement: true,
          primaryKey: true
        },
        validatorId: { type: Sequelize.INTEGER, field: 'validator_id' },
        missionId: { type: Sequelize.INTEGER, field: 'mission_id' },
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
      'slashing_events',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          autoIncrement: true,
          primaryKey: true
        },
        height: { type: Sequelize.INTEGER, field: 'height' },
        consensusAddress: {
          type: Sequelize.STRING(191),
          field: 'consensus_address'
        },
        reason: { type: Sequelize.STRING(191), field: 'reason' },
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
          autoIncrement: true,
          primaryKey: true
        },
        hash: { type: Sequelize.STRING(191), field: 'hash' },
        sender: { type: Sequelize.STRING(191), field: 'sender' },
        action: { type: Sequelize.STRING(191), field: 'action' },
        detail: { type: Sequelize.TEXT, field: 'detail' },
        confirmedAt: { type: Sequelize.DATE, field: 'confirmed_at' },
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
          autoIncrement: true,
          primaryKey: true
        },
        operatorAddress: {
          type: Sequelize.STRING(191),
          field: 'operator_address'
        },
        consensusAddress: {
          type: Sequelize.STRING(191),
          field: 'consensus_address'
        },
        moniker: { type: Sequelize.STRING(191), field: 'moniker' },
        address: { type: Sequelize.STRING(191), field: 'address' },
        consensusHexAddress: {
          type: Sequelize.STRING(191),
          field: 'consensus_hex_address'
        },
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
      'blocks',
      ['height'],
      {
        indexName: 'height_UNIQUE',
        name: 'height_UNIQUE',
        indicesType: 'UNIQUE',
        type: 'UNIQUE',
        transaction
      }
    ]
  },
  {
    fn: 'addIndex',
    params: [
      'missed_blocks',
      ['height', 'consensus_address'],
      {
        indexName: 'unique_missed_blocks_address_height',
        name: 'unique_missed_blocks_address_height',
        indicesType: 'UNIQUE',
        type: 'UNIQUE',
        transaction
      }
    ]
  },
  {
    fn: 'addIndex',
    params: [
      'missed_blocks',
      ['consensus_address'],
      {
        indexName: 'missed_blocks_consensus_address_indexes',
        name: 'missed_blocks_consensus_address_indexes',
        transaction
      }
    ]
  },
  {
    fn: 'addIndex',
    params: [
      'point_histories',
      ['validator_id', 'mission_id'],
      {
        indexName: 'validator_id_mission_id_unique',
        name: 'validator_id_mission_id_unique',
        indicesType: 'UNIQUE',
        type: 'UNIQUE',
        transaction
      }
    ]
  },
  {
    fn: 'addIndex',
    params: [
      'point_histories',
      ['validator_id'],
      {
        indexName: 'validator_id_indexes',
        name: 'validator_id_indexes',
        transaction
      }
    ]
  },
  {
    fn: 'addIndex',
    params: [
      'slashing_events',
      ['height', 'consensus_address'],
      {
        indexName: 'slashing_evenrts_address_height',
        name: 'slashing_evenrts_address_height',
        indicesType: 'UNIQUE',
        type: 'UNIQUE',
        transaction
      }
    ]
  },
  {
    fn: 'addIndex',
    params: [
      'slashing_events',
      ['consensus_address'],
      {
        indexName: 'slashing_events_consensus_address_indexes',
        name: 'slashing_events_consensus_address_indexes',
        transaction
      }
    ]
  },
  {
    fn: 'addIndex',
    params: [
      'txs',
      ['action'],
      { indexName: 'action_indexes', name: 'action_indexes', transaction }
    ]
  },
  {
    fn: 'addIndex',
    params: [
      'txs',
      ['sender'],
      { indexName: 'sender_indexes', name: 'sender_indexes', transaction }
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
        indexName: 'operator_address_UNIQUE',
        name: 'operator_address_UNIQUE',
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
    params: ['blocks', { transaction }]
  },
  {
    fn: 'dropTable',
    params: ['missed_blocks', { transaction }]
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
    params: ['slashing_events', { transaction }]
  },
  {
    fn: 'dropTable',
    params: ['txs', { transaction }]
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
