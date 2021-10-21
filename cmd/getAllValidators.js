const { StargateClient } = require('@cosmjs/stargate')
const { Bech32 } = require('@cosmjs/encoding')
const { sha256 } = require('@cosmjs/crypto')

const fs = require('fs')
const stringify = require('csv-stringify/lib/sync')

const RPCUrl = 'http://167.179.104.210:26657'

const main = async () => {
  let vals = []

  const client = await StargateClient.connect(RPCUrl)
  let validatorResponse = await client.getQueryClient().staking.validators('BOND_STATUS_BONDED')
  let nextKey = validatorResponse.pagination.nextKey
  vals = vals.concat(validatorResponse.validators)

  validatorResponse = await client.getQueryClient().staking.validators('BOND_STATUS_BONDED', nextKey)
  nextKey = validatorResponse.pagination.nextKey
  vals = vals.concat(validatorResponse.validators)

  validatorResponse = await client.getQueryClient().staking.validators('BOND_STATUS_BONDED', nextKey)
  vals = vals.concat(validatorResponse.validators)

  const data = []
  for (const val of vals.values()) {
    const operatorAddress = val.operatorAddress
    const consensusAddress = getConsensusAddress(val.consensusPubkey)
    const moniker = val.description.moniker
    data.push({ operatorAddress, consensusAddress, moniker })
  }
  const outputData = stringify(data, { header: true })

  fs.writeFileSync('output.csv', outputData, { encoding: 'utf8' })
}

function getConsensusAddress (consensusPubkey) {
  const addressData = sha256(consensusPubkey.value.slice(2, 34)).slice(0, 20)
  const bech32Address = Bech32.encode('gamevalcons', addressData)
  return bech32Address
}

main()
