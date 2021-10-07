const Service = require('../../../service/Service')

const service = new Service()

describe('Validators Model', () => {
  test('Total of Validators is 10', async () => {
    const validators = await service.fetchValidators()
    expect(validators.length).toBe(10)
  })
})

describe('Validators Model', () => {
  test('Check validators columns', async () => {
    const q = { validatorID: 1 }
    const res = await service.fetchValidator(q)

    expect(res.operator_address).toBe('cosmosvaloper156gqf9837u7d4c4678yt3rl4ls9c5vuursrrzf')
    expect(res.moniker).toBe('Binance Staking')
    expect(res.address).toBe('cosmos156gqf9837u7d4c4678yt3rl4ls9c5vuuxyhkw6')
    expect(res.totalPoints).toBe(30)
  })
})
