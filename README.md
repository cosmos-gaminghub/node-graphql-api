# node-graphql-api

Blockchain Exporter and GraphQL API for [Neuron Incentivized Testnet](https://github.com/cosmos-gaminghub/testnets/tree/master/neuron-1) using [CosmJS](https://github.com/cosmos/cosmjs) for node client and [Sequelize](https://github.com/sequelize/sequelize) for orm.

## Chain Exporter

```
node exporter/index.js
```

Sync Node data and save them in RDB.
- block
- tx
- beginBlockEvent(`slash`, `liveness`)

## GraphQL API
```
node graphql/index.js
```
