class Result {
  constructor (r) {
    this.code = r.code
    this.height = r.height
    this.rawLog = r.rawLog
    this.transactionHash = r.transactionHash
    this.gasUsed = r.gasUsed
    this.gasWanted = r.gasWanted
  }
}

module.exports = Result
