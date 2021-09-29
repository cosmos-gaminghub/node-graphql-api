const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "addresses", deps: []
 * createTable() => "blocks", deps: []
 * createTable() => "missions", deps: []
 * createTable() => "point_histories", deps: []
 * createTable() => "txs", deps: []
 * createTable() => "tx_types", deps: []
 * createTable() => "validators", deps: []
 * addIndex(height_UNIQUE) => "blocks"
 * addIndex(validator_id_indexes) => "point_histories"
 * addIndex(hash_UNIQUE) => "txs"
 * addIndex(sender_indexes) => "txs"
 * addIndex(type_indexes) => "txs"
 * addIndex(operator_address_UNIQUE) => "validators"
 *
 */

const info = {
  revision: 1,
  name: "inits",
  created: "2021-09-28T15:33:27.541Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "addresses",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
        },
        validator_id: { type: Sequelize.INTEGER, field: "validator_id" },
        address: { type: Sequelize.STRING(191), field: "address" },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "blocks",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
        },
        chain_id: { type: Sequelize.STRING(191), field: "chain_id" },
        height: { type: Sequelize.INTEGER, field: "height" },
        proposer: { type: Sequelize.STRING(191), field: "proposer" },
        block_hash: { type: Sequelize.STRING(191), field: "block_hash" },
        num_txs: { type: Sequelize.INTEGER, field: "num_txs" },
        timestamp: { type: Sequelize.DATE, field: "timestamp" },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "missions",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
        },
        point: { type: Sequelize.INTEGER, field: "point" },
        detail: { type: Sequelize.TEXT, field: "detail" },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "point_histories",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
        },
        validator_id: { type: Sequelize.INTEGER, field: "validator_id" },
        mission_id: { type: Sequelize.INTEGER, field: "mission_id" },
        point: { type: Sequelize.INTEGER, field: "point" },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "txs",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
        },
        hash: { type: Sequelize.STRING(191), field: "hash" },
        sender: { type: Sequelize.STRING(191), field: "sender" },
        type: { type: Sequelize.INTEGER, field: "type" },
        detail: { type: Sequelize.TEXT, field: "detail" },
        confirmed_at: { type: Sequelize.DATE, field: "confirmed_at" },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "tx_types",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
        },
        name: { type: Sequelize.STRING(191), field: "name" },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "validators",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
        },
        operator_address: {
          type: Sequelize.STRING(191),
          field: "operator_address",
        },
        moniker: { type: Sequelize.STRING(191), field: "moniker" },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "addIndex",
    params: [
      "blocks",
      ["height"],
      {
        indexName: "height_UNIQUE",
        name: "height_UNIQUE",
        indicesType: "UNIQUE",
        type: "UNIQUE",
        transaction,
      },
    ],
  },
  {
    fn: "addIndex",
    params: [
      "point_histories",
      ["validator_id"],
      {
        indexName: "validator_id_indexes",
        name: "validator_id_indexes",
        transaction,
      },
    ],
  },
  {
    fn: "addIndex",
    params: [
      "txs",
      ["hash"],
      {
        indexName: "hash_UNIQUE",
        name: "hash_UNIQUE",
        indicesType: "UNIQUE",
        type: "UNIQUE",
        transaction,
      },
    ],
  },
  {
    fn: "addIndex",
    params: [
      "txs",
      ["sender"],
      { indexName: "sender_indexes", name: "sender_indexes", transaction },
    ],
  },
  {
    fn: "addIndex",
    params: [
      "txs",
      ["type"],
      { indexName: "type_indexes", name: "type_indexes", transaction },
    ],
  },
  {
    fn: "addIndex",
    params: [
      "validators",
      ["operator_address"],
      {
        indexName: "operator_address_UNIQUE",
        name: "operator_address_UNIQUE",
        indicesType: "UNIQUE",
        type: "UNIQUE",
        transaction,
      },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["addresses", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["blocks", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["missions", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["point_histories", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["txs", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["tx_types", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["validators", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
