class Root {
  constructor (service) {
    this.service = service
  }

  init () {
    const resolver = {
      sendToken: this.service.sendToken
    }
    return resolver
  }
}

module.exports = Root
