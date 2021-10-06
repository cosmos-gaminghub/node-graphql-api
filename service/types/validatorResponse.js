class ValidatorResponse {
  setMoniker (a) {
    this.moniker = a
    return this
  }

  setOperatorAddress (a) {
    this.operator_address = a
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
