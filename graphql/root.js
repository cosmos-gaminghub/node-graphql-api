class Root {
  constructor (service) {
    this.service = service
  }

  init () {
    const resolver = {
      fetchMission: this.service.fetchMission,
      fetchMissions: this.service.fetchMissions,
      fetchValidator: this.service.fetchValidator,
      fetchValidators: this.service.fetchValidators,
      fetchTxCount: this.service.fetchTxCount,
      fetchMissionResult: this.service.fetchMissionResult,
      fetchMyPoint: this.service.fetchMyPoint
    }
    return resolver
  }
}

module.exports = Root
