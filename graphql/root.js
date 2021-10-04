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
      fetchTxCount: this.service.fetchTxCount
    }
    return resolver
  }
}

module.exports = Root
