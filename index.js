const dotenv = require('dotenv')
dotenv.config()

const { DirectSecp256k1HdWallet } = require('@cosmjs/proto-signing')
const { assertIsBroadcastTxSuccess, SigningStargateClient, GasPrice } = require('@cosmjs/stargate')

const mnemonic = process.env.MNEMONIC
const rpcEndpoint = process.env.RPC_ENDPOINT

const main = async () => {
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic)
  const [firstAccount] = await wallet.getAccounts()

  const gasPrice = GasPrice.fromString('0.025uatom')
  const gasLimits = {
    send: 100000
  }
  const options = { gasPrice: gasPrice, gasLimits: gasLimits }
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet, options)

  const recipient = process.env.RECIPIENT
  const amount = {
    denom: 'uatom',
    amount: '1'
  }

  const result = await client.sendTokens(firstAccount.address, recipient, [amount], 'memo')
  assertIsBroadcastTxSuccess(result)
}

main()
