const { StargateClient, logs } = require('@cosmjs/stargate')
const sleep = require('./sleep')

// const url = 'http://167.179.104.210:1317'
const RPCUrl = 'http://198.13.33.206:26657'
// const RPCUrl = 'http://167.179.104.210:26657'

const WrapperOrm = require('./orm/OrmWrapper')

const main = async () => {
  console.log('Starting Chain Exporter...')

  while (true) {
    try {
      console.log('start - sync blockchain')
      await sync()
      console.log('finish - sync blockchain')
    } catch (e) {
      console.error('error - sync blockchain: ', e)
    }
    console.log('sleeping...')
    await sleep(3000)
  }
}

main()

async function sync () {
  const orm = new WrapperOrm()
  const blockInDB = await orm.getLatestBlockFromDB()
  const blockInDBHeight = blockInDB.height

  const client = await StargateClient.connect(RPCUrl)

  let block

  try {
    block = await client.getBlock()
  } catch (e) {
    throw new Error('Not found block from lcd: ', e)
  }

  const latestBlockHeight = block.header.height

  for (let i = blockInDBHeight + 1; i < latestBlockHeight; i++) {
    try {
      console.log('start - process')
      await process(i)
      console.log('finish- process')
    } catch (e) {
      console.error('process err: ', e)
      throw new Error('process error: : ', e)
    }
    console.log('synced block: ', i)
  }
}

async function process (height) {
  const client = await StargateClient.connect(RPCUrl)

  let block

  try {
    block = await client.getBlock(height)
  } catch (e) {
    throw new Error('Not found block from lcd: ', e)
  }

  const orm = new WrapperOrm()
  orm.saveBlock(
    block.header.height,
    block.id,
    block.txs.length,
    block.header.time
  )

  const q = { height: height }
  let txs
  try {
    txs = await client.searchTx(q)
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
    } catch (error) {
      console.log('parse err: ', error)
      continue
    }

    orm.saveTx(
      tx.hash,
      sender.value,
      action.value,
      tx.rawLog,
      new Date()
    )
  }

  let validatorSets

  try {
    validatorSets = await client.getTmClient().validatorsAll(height)
  } catch (e) {
    throw new Error('Not found validator set: ', e)
  }

  console.log('validator sets: ', validatorSets)
}
