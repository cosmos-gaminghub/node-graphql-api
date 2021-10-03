class Root {
  constructor (service) {
    this.service = service
  }

  init () {
    const resolver = {
      fetchMission: this.service.fetchMission,
      fetchMissions: this.service.fetchMissions,
      fetchTxCount: this.service.fetchTxCount,
      fetchValidators: this.service.fetchValidators
    }
    return resolver
  }
}

module.exports = Root
