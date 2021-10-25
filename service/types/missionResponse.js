class MissionResponse {
  constructor (id) {
    this.id = id
  }

  setName (a) {
    this.name = a
    return this
  }

  setDetail (a) {
    this.detail = a
    return this
  }

  setPoint (a) {
    this.point = a
    return this
  }

  setIsCompleted (a) {
    this.isCompleted = a
    return this
  }

  setTotalPoints (a) {
    this.totalPoints = a
    return this
  }
}

module.exports = MissionResponse
