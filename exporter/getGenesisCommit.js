const { StargateClient } = require('@cosmjs/stargate')
const { Bech32 } = require('@cosmjs/encoding')
const toCSV = require('../utils/toCSV')

const RPCUrl = 'http://167.179.104.210:26657'

const main = async () => {
  const client = await StargateClient.connect(RPCUrl)

  const commitResult = await client.getTmClient().commit(1)

  const validators = []

  for (const signature of commitResult.commit.signatures) {
    if (signature.blockIdFlag === 2) {
      const valAddr = signature.validatorAddress
      // const strAddress = toHex(valAddr).toLocaleUpperCase()
      const consensusAddress = Bech32.encode('gamevalcons', valAddr)
      validators.push({ consensusAddress })
    }
  }
  console.log(validators)
  console.log(validators.length)
  toCSV(validators)
}

main()
