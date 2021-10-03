/**
 * Auto generated by MySQL Workbench Schema Exporter.
 * Version 3.1.5-dev (node-sequelize6 dev) on 2021-10-03 07:43:37.
 * Goto
 * https://github.com/mysql-workbench-schema-exporter/mysql-workbench-schema-exporter
 * for more information.
 */

const { DataTypes, Model } = require('sequelize')

class Mission extends Model {
}

module.exports = (sequelize) => {
  return Mission.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(191)
    },
    detail: {
      type: DataTypes.STRING(191)
    },
    point: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize: sequelize,
    modelName: 'Mission',
    tableName: 'missions',
    timestamps: true,
    underscored: true,
    syncOnAssociation: false
  })
}
