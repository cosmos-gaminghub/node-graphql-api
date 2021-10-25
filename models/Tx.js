/**
 * Auto generated by MySQL Workbench Schema Exporter.
 * Version 3.1.5-dev (node-sequelize6 dev) on 2021-10-25 07:01:26.
 * Goto
 * https://github.com/mysql-workbench-schema-exporter/mysql-workbench-schema-exporter
 * for more information.
 */

const { DataTypes, Model } = require('sequelize')

class Tx extends Model {
}

module.exports = (sequelize) => {
  return Tx.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    hash: {
      type: DataTypes.STRING(191)
    },
    sender: {
      type: DataTypes.STRING(191)
    },
    action: {
      type: DataTypes.STRING(191)
    },
    detail: {
      type: DataTypes.TEXT
    },
    confirmedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize: sequelize,
    modelName: 'Tx',
    tableName: 'txs',
    indexes: [
      {
        name: 'hash_UNIQUE',
        fields: ['hash'],
        unique: true
      },
      {
        name: 'sender_indexes',
        fields: ['sender']
      },
      {
        name: 'action_indexes',
        fields: ['action']
      }
    ],
    timestamps: true,
    underscored: true,
    syncOnAssociation: false
  })
}
