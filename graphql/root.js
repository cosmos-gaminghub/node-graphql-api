class Root {
  constructor (service) {
    this.service = service
  }

  init () {
    const resolver = {
      fetchMission: this.service.fetchMission,
      fetchMissions: this.service.fetchMissions
    }
    return resolver
  }
}

module.exports = Root
