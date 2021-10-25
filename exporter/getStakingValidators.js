const { StargateClient } = require('@cosmjs/stargate')
const { sha256 } = require('@cosmjs/crypto')
const { Bech32 } = require('@cosmjs/encoding')
const toCSV = require('../utils/toCSV')

const RPCUrl = 'http://167.179.104.210:26657'

const getValidatorSet = async () => {
  const client = await StargateClient.connect(RPCUrl)

  let totalValidators = []

  let nextKey

  for (let i = 0; i <= 2; i++) {
    const validatorsAllResult = await client.getQueryClient().staking.validators('BOND_STATUS_BONDED', nextKey)
    nextKey = validatorsAllResult.pagination.nextKey
    totalValidators = totalValidators.concat(getValidators(validatorsAllResult.validators))
  }

  console.log(totalValidators)
  console.log(totalValidators.length)
  toCSV(totalValidators)
}

function getValidators (validators) {
  const vals = []
  for (const validator of validators) {
    const operatorAddress = validator.operatorAddress
    const moniker = validator.description.moniker
    const consensusAddress = createConsensusAddress(validator.consensusPubkey)

    const val = {
      operatorAddress: operatorAddress,
      moniker: moniker,
      consensusAddress: consensusAddress
    }
    vals.push(val)
  }
  return vals
}

function createConsensusAddress (pubkey) {
  const addressData = sha256(pubkey.value.slice(2, 34)).slice(0, 20)
  const bech32Address = Bech32.encode('gamevalcons', addressData)
  return bech32Address
}

getValidatorSet()
