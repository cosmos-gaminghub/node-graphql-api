/**
 * Auto generated by MySQL Workbench Schema Exporter.
 * Version 3.1.5-dev (node-sequelize6 dev) on 2021-10-25 15:55:01.
 * Goto
 * https://github.com/mysql-workbench-schema-exporter/mysql-workbench-schema-exporter
 * for more information.
 */

const { DataTypes, Model } = require('sequelize')

class SlashingEvent extends Model {
}

module.exports = (sequelize) => {
  return SlashingEvent.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    height: {
      type: DataTypes.INTEGER
    },
    consensusAddress: {
      type: DataTypes.STRING(191)
    },
    reason: {
      type: DataTypes.STRING(191)
    }
  }, {
    sequelize: sequelize,
    modelName: 'SlashingEvent',
    tableName: 'slashing_events',
    indexes: [
      {
        name: 'slashing_events_consensus_address_indexes',
        fields: ['consensus_address']
      },
      {
        name: 'slashing_evenrts_address_height',
        fields: ['height', 'consensus_address'],
        unique: true
      }
    ],
    timestamps: true,
    underscored: true,
    syncOnAssociation: false
  })
}
