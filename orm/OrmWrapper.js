const { Tx, Block, MissedBlock } = require('../models')

class OrmWrapper {
  async getLatestBlockFromDB () {
    return await Block.findOne({
      order: [['id', 'DESC']]
    })
      .catch(error => console.log(error))
  }

  async saveBlock (height, blockHash, numTxs, timestamp) {
    return await Block.create({
      height: height,
      block_hash: blockHash,
      num_txs: numTxs,
      timestamp: timestamp
    })
      .catch(error => console.log(error))
  }

  async saveTx (hash, sender, action, detail, confirmedAt) {
    return await Tx.create({
      hash: hash,
      sender: sender,
      action: action,
      detail: detail,
      confirmed_at: confirmedAt
    })
      .catch(error => console.log(error))
  }

  async saveMissedBlock (height, operatorAddress) {
    return await MissedBlock.create({
      height: height,
      operatorAddress: operatorAddress
    })
      .catch(error => console.log(error))
  }
}

module.exports = OrmWrapper
