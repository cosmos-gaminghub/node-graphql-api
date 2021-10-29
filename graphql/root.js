class Root {
  constructor (service) {
    this.service = service
  }

  init () {
    const resolver = {
      fetchValidator: this.service.fetchValidator,
      fetchValidators: this.service.fetchValidators,
      fetchMissionResult: this.service.fetchMissionResult,
      fetchMyPoint: this.service.fetchMyPoint
    }
    return resolver
  }
}

module.exports = Root
