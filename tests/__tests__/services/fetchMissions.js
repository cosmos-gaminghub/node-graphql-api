const Service = require('../../../service/Service')

const service = new Service()

describe('Missions Model', () => {
  test('Total of Missions is 8', async () => {
    const missions = await service.fetchMissions()
    expect(missions.length).toBe(8)
  })
})

describe('Missions Model', () => {
  test('Check mission columns', async () => {
    const q = { missionID: 1 }
    const mission = await service.fetchMission(q)

    const columns = Object.keys(mission.rawAttributes)
    expect(columns.indexOf('name')).toBe(1)
    expect(columns.indexOf('detail')).toBe(2)
    expect(columns.indexOf('point')).toBe(3)
  })
})
