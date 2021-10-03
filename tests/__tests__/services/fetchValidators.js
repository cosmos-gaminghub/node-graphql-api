const Service = require('../../../service/Service')

const service = new Service()

describe('Validators Model', () => {
  test('Total of Validators is 10', async () => {
    const validators = await service.fetchValidators()
    expect(validators.length).toBe(10)
  })
})
