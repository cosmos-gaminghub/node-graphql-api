const { sequelize, Mission } = require('../models')
const { QueryTypes } = require('sequelize')

class Service {
  async fetchMissions () {
    const missions = await Mission.findAll()
    return missions
  }

  async fetchMission (args) {
    const mission = await Mission.findOne({ where: { id: args.missionID } })
    return mission
  }

  async fetchTxCount (args) {
    const results = await sequelize.query(
      'SELECT COUNT(*) as total_txs FROM `TXS` WHERE SENDER = ?',
      {
        replacements: [args.sender],
        type: QueryTypes.SELECT
      }
    )
    // response format: { total_txs: 2 }
    return results[0]
  }
}

module.exports = Service
