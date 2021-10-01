const { StargateClient, logs } = require('@cosmjs/stargate')

// const url = 'http://167.179.104.210:1317'
const RPCUrl = 'http://198.13.33.206:26657'
// const RPCUrl = 'http://167.179.104.210:26657'

const WrapperOrm = require('./orm/OrmWrapper')

async function main () {
  console.log('Starting Chain Exporter...')

  getandSaveBlock()
}

main()

async function getandSaveBlock () {
  const orm = new WrapperOrm()
  const blockInDB = await orm.getLatestBlockFromDB()
  const blockInDBHeight = blockInDB.height

  const client = await StargateClient.connect(RPCUrl)
  const block = await client.getBlock()
  const latestBlockHeight = block.header.height

  for (let i = blockInDBHeight + 1; i < latestBlockHeight; i++) {
    await process(i)
    console.log('synced block: ', i)
  }
}

async function process (height) {
  const client = await StargateClient.connect(RPCUrl)
  const block = await client.getBlock(height)

  const orm = new WrapperOrm()
  orm.saveBlock(
    block.header.chainId,
    block.header.height,
    block.id,
    block.txs.length,
    block.header.time
  )

  const q = { height: height }
  const txs = await client.searchTx(q)

  for (const tx of txs.values()) {
    console.log('tx: ', tx)

    let sender = {
      value: 'none'
    }
    let action = {
      value: 'none'
    }

    try {
      const log = logs.parseRawLog(tx.rawLog)
      console.log('log:', log)

      action = logs.findAttribute(log, 'message', 'action')
      console.log('message type:', action)

      sender = logs.findAttribute(log, 'message', 'sender')
      console.log('message sender:', sender)
    } catch (error) {
      console.log('parse err: ', error)
    }

    orm.saveTx(
      tx.hash,
      sender.value,
      action.value,
      tx.rawLog,
      new Date()
    )
  }
}
