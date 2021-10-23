const { Tx, Block, MissedBlock, SlashingEvent} = require('../models')

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
      blockHash: blockHash,
      numTxs: numTxs,
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
      confirmedAt: confirmedAt
    })
      .catch(error => console.log(error))
  }

  async saveMissedBlock (height, consensusAddress) {
    return await MissedBlock.create({
      height: height,
      consensusAddress: consensusAddress
    })
      .catch(error => console.log(error))
  }

  async saveSlashEvent (height, consensusAddress, reason) {
    return await SlashingEvent.create({
      height: height,
      consensusAddress: consensusAddress,
      reason: reason
    })
      .catch(error => console.log(error))
  }
}

module.exports = OrmWrapper
