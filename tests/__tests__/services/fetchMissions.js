const Service = require('../../../service/Service')

const service = new Service()

describe('Missions Model', () => {
  test('Total of Missions is 8', async () => {
    const missions = await service.fetchMissions()
    expect(missions.length).toBe(8)
  })
})
