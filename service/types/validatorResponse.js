class ValidatorResponse {
  constructor (id) {
    this.id = id
  }

  setMoniker (a) {
    this.moniker = a
    return this
  }

  setOperatorAddress (a) {
    this.operatorAddress = a
    return this
  }

  setAddress (a) {
    this.address = a
    return this
  }

  setTotalTxs (a) {
    this.totalTxs = a
    return this
  }

  setTotalPoints (a) {
    this.totalPoints = a
    return this
  }
}

module.exports = ValidatorResponse
