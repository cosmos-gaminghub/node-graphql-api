const { StargateClient } = require('@cosmjs/stargate')
const { Exporter } = require('./exporter')
const WrapperOrm = require('../orm/OrmWrapper')
const sleep = require('../utils/sleep')

// const url = 'http://167.179.104.210:1317'
// const RPCUrl = 'http://198.13.33.206:26657'
const RPCUrl = 'http://167.179.117.190:26657'

const main = async () => {
  console.log('Starting Chain Exporter...')
  const client = await StargateClient.connect(RPCUrl)
  const orm = new WrapperOrm()
  const exporter = new Exporter(client, orm)

  while (true) {
    try {
      await exporter.sync()
    } catch (e) {
      console.error('error - sync blockchain: ', e)
    }
    console.log('sleeping...')
    await sleep(3000)
  }
}

main()
