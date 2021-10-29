const { sequelize, Mission, Validator } = require('../models')
const { QueryTypes } = require('sequelize')
const ValidatorResponse = require('./types/validatorResponse')
const MissionResponse = require('./types/missionResponse')

class Service {
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

    // get slash count
    const slashedCountResults = await sequelize.query(
      'SELECT consensus_address as consensusAddress, count(*) as slashedCounts from slashing_events group by consensus_address HAVING count (*) > 0;'
    )

    const slashedCountResultsDict = {}
    for (const result of slashedCountResults[0]) {
      slashedCountResultsDict[result.consensusAddress] = result.slashedCounts
    }

    const validatorsResponse = []
    for (const val of validators) {
      const res = new ValidatorResponse(val.id)
        .setOperatorAddress(val.operatorAddress)
        .setAddress(val.address)
        .setMoniker(val.moniker)
        .setTotalTxs(txResultsDict[val.address])
        .setTotalMissedBlocks(missedBlockResultsDict[val.consensusAddress])
        .setTotalSlashedCounts(slashedCountResultsDict[val.consensusAddress])

      validatorsResponse.push(res)
    }

    return validatorsResponse
  }

  async fetchValidator (args) {
    const val = await Validator.findOne(
      { where: { id: args.validatorID } }
    )

    // get total_txs data
    const txResult = await sequelize.query(
      'SELECT sender, COUNT(*) as totalTxs FROM txs where sender = ? ;',
      {
        replacements: [val.address],
        type: QueryTypes.SELECT
      }
    )
    console.log(txResult)

    // get missed block data
    const missedBlockResult = await sequelize.query(
      'SELECT consensus_address as consensusAddress, count(*) as missedBlocks from missed_blocks where consensus_address = ?;',
      {
        replacements: [val.consensusAddress],
        type: QueryTypes.SELECT
      }
    )

    // get slash count
    const slashedCountResult = await sequelize.query(
      'SELECT consensus_address as consensusAddress, count(*) as slashedCounts from slashing_events where consensus_address = ?',
      {
        replacements: [val.consensusAddress],
        type: QueryTypes.SELECT
      }
    )

    const res = new ValidatorResponse(val.id)
      .setOperatorAddress(val.operatorAddress)
      .setAddress(val.address)
      .setMoniker(val.moniker)
      .setTotalTxs(txResult[0].totalTxs)
      .setTotalMissedBlocks(missedBlockResult[0].missedBlocks)
      .setTotalSlashedCounts(slashedCountResult[0].slashedCounts)

    return res
  }

  async fetchMissionResult (args) {
    const missions = await Mission.findAll()

    const result = await sequelize.query(
      'SELECT id FROM missions WHERE id in (SELECT mission_id FROM point_histories WHERE validator_id = ?)',
      {
        replacements: [args.validatorID],
        type: QueryTypes.SELECT
      }
    )
    const clearedMissionIDs = result.map(value => {
      return value.id
    })

    const missionsResponse = []
    for (const mission of missions) {
      const res = new MissionResponse(mission.id)
        .setName(mission.name)
        .setDetail(mission.detail)
        .setPoint(mission.point)
        .setIsCompleted(clearedMissionIDs.includes(mission.id))

      missionsResponse.push(res)
    }
    return missionsResponse
  }

  async fetchMyPoint (args) {
    const result = await sequelize.query(
      'SELECT sum(point) as totalPoints FROM missions WHERE id in (SELECT mission_id FROM point_histories WHERE validator_id = ?)',
      {
        replacements: [args.validatorID],
        type: QueryTypes.SELECT
      }
    )
    return result[0]
  }
}

module.exports = Service
