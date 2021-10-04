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
    const validator = await service.fetchValidator(q)
    console.log(validator)

    const columns = Object.keys(validator.rawAttributes)
    expect(columns.indexOf('operator_address')).toBe(1)
    expect(columns.indexOf('moniker')).toBe(2)
    expect(columns.indexOf('address')).toBe(3)
  })
})
