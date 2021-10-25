const Service = require('../../../service/Service')

const service = new Service()

describe('Mission Histories', () => {
  test('Total of point is 30', async () => {
    const q = { validatorID: 1 }
    const res = await service.fetchMyPoint(q)
    expect(res.totalPoints).toBe(30)
  })
})
