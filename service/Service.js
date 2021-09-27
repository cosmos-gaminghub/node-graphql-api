const { Mission } = require('../models')

class Service {
  async fetchMissions (args) {
    const missions = await Mission.findAll()
    return missions
  }

  async fetchMission (args) {
    const mission = await Mission.findOne({ where: { id: args.missionID } })
    return mission
  }
}

module.exports = Service
