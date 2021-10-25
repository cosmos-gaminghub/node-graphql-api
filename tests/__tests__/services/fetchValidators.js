const Service = require('../../../service/Service')

const service = new Service()

describe('Validators Model', () => {
  test('Total of Validators is 10', async () => {
    const validators = await service.fetchValidators()
    expect(validators.length).toBe(10)

    expect(validators[0].operatorAddress).toBe('cosmosvaloper156gqf9837u7d4c4678yt3rl4ls9c5vuursrrzf')
    expect(validators[0].moniker).toBe('Binance Staking')
    expect(validators[0].address).toBe('cosmos156gqf9837u7d4c4678yt3rl4ls9c5vuuxyhkw6')
  })
})
