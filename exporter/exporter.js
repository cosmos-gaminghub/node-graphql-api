const { logs } = require('@cosmjs/stargate')

class Exporter {
  constructor (client, orm) {
    this.client = client
    this.orm = orm
  }

  async sync () {
    const blockInDB = await this.orm.getLatestBlockFromDB()

    let blockInDBHeight

    if (blockInDB == null) {
      blockInDBHeight = 1
    } else {
      blockInDBHeight = blockInDB.height
    }

    let block

    try {
      block = await this.client.getBlock()
    } catch (e) {
      throw new Error('Not found block from lcd: ', e)
    }

    const latestBlockHeight = block.header.height

    for (let i = blockInDBHeight + 1; i < latestBlockHeight; i++) {
      try {
        console.log('start - process')
        await this.process(i)
        console.log('finish- process')
      } catch (e) {
        console.error('process err: ', e)
        throw new Error('process error: : ', e)
      }
      console.log('synced block: ', i)
    }
  }

  async process (height) {
    await this.getAndSaveBlock(height)
    await this.searchAndSaveTxs(height)
    await this.checkBeginBlockEvents(height)
  }

  async getAndSaveBlock (height) {
    let block

    try {
      block = await this.client.getBlock(height)
    } catch (e) {
      throw new Error('Not found block from lcd: ', e)
    }

    this.orm.saveBlock(
      block.header.height,
      block.id,
      block.txs.length,
      block.header.time
    )
  }

  async searchAndSaveTxs (height) {
    const q = { height: height }
    let txs
    try {
      txs = await this.client.searchTx(q)
    } catch (e) {
      throw new Error('Not found txs from lcd: ', e)
    }

    for (const tx of txs.values()) {
      let action
      let sender

      try {
        const log = logs.parseRawLog(tx.rawLog)

        action = logs.findAttribute(log, 'message', 'action')
        sender = logs.findAttribute(log, 'message', 'sender')

        this.orm.saveTx(
          tx.hash,
          sender.value,
          action.value,
          tx.rawLog,
          new Date()
        )
      } catch (error) {
        console.log('parse err: ', error)
        continue
      }
    }
  }

  async checkBeginBlockEvents (height) {
    let blockResult
    try {
      blockResult = await this.client.getTmClient().blockResults(height)
    } catch (e) {
      throw new Error('Not found blockResults: ', e)
    }

    const beginBlockEvents = blockResult.beginBlockEvents
    for (const event of beginBlockEvents) {
      if (event.type === 'liveness') {
        let height
        let consensusAddress
        console.log(event.type)

        event.attributes.forEach(function (v) {
          const ak = Buffer.from(v.key).toString()
          if (ak === 'address') {
            consensusAddress = Buffer.from(v.value).toString()
          }
          if (ak === 'height') {
            height = Buffer.from(v.value).toString()
          }
        })
        console.log('height:', height)
        console.log('consensusAddress:', consensusAddress)
        this.orm.saveMissedBlock(height, consensusAddress)
        console.log('saved missed block')
      }

      if (event.type === 'slash') {
        let consensusAddress
        let reason

        event.attributes.forEach(function (v) {
          const ak = Buffer.from(v.key).toString()
          if (ak === 'address') {
            consensusAddress = Buffer.from(v.value).toString()
          }
          if (ak === 'reason') {
            reason = Buffer.from(v.value).toString()
          }
        })
        this.orm.saveSlashEvent(height, consensusAddress, reason)
      }
    }
  }
}

module.exports = {
  Exporter
}
