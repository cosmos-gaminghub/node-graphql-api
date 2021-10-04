const Service = require('../../../service/Service')

const service = new Service()

describe('Mission Histories', () => {
  test('Total of completed Missions is 3', async () => {
    const q = { validatorID: 1 }
    const completedMissions = await service.fetchMissionResult(q)
    expect(completedMissions.length).toBe(3)
  })
})
