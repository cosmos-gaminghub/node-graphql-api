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

    const txResultsDict = {}
    for (const tx of txResults[0]) {
      txResultsDict[tx.sender] = tx.totalTxs
    }

    // get missed block data
    const missedBlockResults = await sequelize.query(
      'SELECT consensus_address as consensusAddress, count(*) as missedBlocks from missed_blocks mb group by consensus_address HAVING count (*) > 0;'
    )

    const missedBlockResultsDict = {}
    for (const result of missedBlockResults[0]) {
      missedBlockResultsDict[result.consensusAddress] = result.missedBlocks
    }

    const validatorsResponse = []
    for (const val of validators) {
      const res = new ValidatorResponse(val.validatorID)
        .setOperatorAddress(val.operatorAddress)
        .setAddress(val.address)
        .setMoniker(val.moniker)
        .setTotalTxs(txResultsDict[val.address])
        .setTotalMissedBlocks(missedBlockResultsDict[val.consensusAddress])

      validatorsResponse.push(res)
    }
    console.log(validatorsResponse)

    return validatorsResponse
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
