const { sequelize, Mission, Validator } = require('../models')
const { QueryTypes } = require('sequelize')
const ValidatorResponse = require('./types/validatorResponse')

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

    // get total_txs data
    const txResults = await sequelize.query(
      'SELECT sender, COUNT(*) as totalTxs FROM txs GROUP BY sender HAVING(COUNT(*)>=1) ;'
    )

    console.log(txResults[0])
    return validators
  }

  async fetchValidator (args) {
    const validator = await Validator.findOne(
      { where: { id: args.validatorID } }
    )
    // get total_txs data
    const txResult = await sequelize.query(
      'SELECT COUNT(*) as totalTxs FROM `TXS` WHERE ( SELECT address FROM `validators` WHERE id = ?)',
      {
        replacements: [args.validatorID],
        type: QueryTypes.SELECT
      }
    )

    // get mission clear point data
    const pointResult = await sequelize.query(
      'SELECT sum(point) as totalPoints FROM missions WHERE id in (SELECT mission_id FROM point_histories WHERE validator_id = ?)',
      {
        replacements: [args.validatorID],
        type: QueryTypes.SELECT
      }
    )

    const res = new ValidatorResponse(args.validatorID)
      .setOperatorAddress(validator.operatorAddress)
      .setAddress(validator.address)
      .setMoniker(validator.moniker)
      .setTotalTxs(txResult[0].totalTxs)
      .setTotalPoints(pointResult[0].totalPoints)

    return res
  }

  async fetchTxCount (args) {
    const result = await sequelize.query(
      'SELECT COUNT(*) as totalTxs FROM `TXS` WHERE ( SELECT address FROM `validators` WHERE id = ?)',
      {
        replacements: [args.validatorID],
        type: QueryTypes.SELECT
      }
    )
    // response format: { total_txs: 2 }
    return result
  }

  async fetchMissionResult (args) {
    const result = await sequelize.query(
      'SELECT * FROM missions WHERE id in (SELECT mission_id FROM point_histories WHERE validator_id = ?)',
      {
        replacements: [args.validatorID],
        type: QueryTypes.SELECT
      }
    )
    // response format: [Mission]
    return result
  }

  async fetchMyPoint (args) {
    const result = await sequelize.query(
      'SELECT sum(point) as totalPoints FROM missions WHERE id in (SELECT mission_id FROM point_histories WHERE validator_id = ?)',
      {
        replacements: [args.validatorID],
        type: QueryTypes.SELECT
      }
    )
    // response format: [MyPoint]
    return result[0]
  }
}

module.exports = Service
