/**
 * Auto generated by MySQL Workbench Schema Exporter.
 * Version 3.1.5-dev (node-sequelize6 dev) on 2021-10-25 15:55:01.
 * Goto
 * https://github.com/mysql-workbench-schema-exporter/mysql-workbench-schema-exporter
 * for more information.
 */

const { DataTypes, Model } = require('sequelize')

class Block extends Model {
}

module.exports = (sequelize) => {
  return Block.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    height: {
      type: DataTypes.INTEGER
    },
    proposer: {
      type: DataTypes.STRING(191)
    },
    blockHash: {
      type: DataTypes.STRING(191)
    },
    numTxs: {
      type: DataTypes.INTEGER
    },
    timestamp: {
      type: DataTypes.DATE
    }
  }, {
    sequelize: sequelize,
    modelName: 'Block',
    tableName: 'blocks',
    indexes: [
      {
        name: 'height_UNIQUE',
        fields: ['height'],
        unique: true
      }
    ],
    timestamps: true,
    underscored: true,
    syncOnAssociation: false
  })
}
