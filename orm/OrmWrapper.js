const { Tx, Block } = require('../models')

class OrmWrapper {
  async getLatestBlockFromDB () {
    return await Block.findOne({
      order: [['id', 'DESC']]
    })
      .catch(error => console.log(error))
  }

  async saveBlock (chainId, height, blockHash, numTxs, timestamp) {
    return await Block.create({
      chain_id: chainId,
      height: height,
      block_hash: blockHash,
      num_txs: numTxs,
      timestamp: timestamp
    })
      .catch(error => console.log(error))
  }

  async saveTx (hash, sender, type, detail, confirmedAt) {
    return await Tx.create({
      hash: hash,
      sender: sender,
      type: type,
      detail: detail,
      confirmed_at: confirmedAt
    })
      .catch(error => console.log(error))
  }
}

module.exports = OrmWrapper
