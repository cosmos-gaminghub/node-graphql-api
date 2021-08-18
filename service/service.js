const dotenv = require('dotenv')
dotenv.config()

const Result = require('./types.js')

const { DirectSecp256k1HdWallet } = require('@cosmjs/proto-signing')
const { SigningStargateClient, GasPrice } = require('@cosmjs/stargate')

const mnemonic = process.env.MNEMONIC
const rpcEndpoint = process.env.RPC_ENDPOINT

class Service {
  static async sendToken (args) {
    // TODO: set args correctly
    console.log(args)

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
    return new Result(result)
  }
}

module.exports = Service
