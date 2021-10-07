const Service = require('../../../service/Service')

const service = new Service()

describe('Mission Histories', () => {
  test('Total of completed Missions is 3', async () => {
    const q = { validatorID: 1 }
    const completedMissions = await service.fetchMissionResult(q)
    expect(completedMissions.length).toBe(3)
  })
})

describe('Mission Histories', () => {
  test('Total of point is 30', async () => {
    const q = { validatorID: 1 }
    const res = await service.fetchMyPoint(q)
    expect(res.totalPoints).toBe(30)
  })
})
