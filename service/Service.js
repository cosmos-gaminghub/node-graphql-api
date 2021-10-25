const { sequelize, Mission, Validator } = require('../models')
const { QueryTypes } = require('sequelize')
const ValidatorResponse = require('./types/validatorResponse')

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
    return result[0]
  }
}

module.exports = Service
