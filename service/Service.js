const { sequelize, Mission, Validator } = require('../models')
const { QueryTypes } = require('sequelize')

class Service {
  async fetchMissions () {
    const missions = await Mission.findAll()
    return missions
  }

  async fetchMission (args) {
    const mission = await Mission.findOne(
      { where: { id: args.missionID } }
    )
    return mission
  }

  async fetchValidators () {
    const validators = await Validator.findAll()
    return validators
  }

  async fetchValidator (args) {
    const validator = await Validator.findOne(
      { where: { id: args.validatorID } }
    )
    return validator
  }

  async fetchTxCount (args) {
    const result = await sequelize.query(
      'SELECT COUNT(*) as total_txs FROM `TXS` WHERE ( SELECT address FROM `validators` WHERE id = ?)',
      {
        replacements: [args.validatorID],
        type: QueryTypes.SELECT
      }
    )
    // response format: { total_txs: 2 }
    return result
  }
}

module.exports = Service
