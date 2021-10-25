const Service = require('../../../service/Service')

const service = new Service()

describe('Mission Histories', () => {
  test('Total of completed Missions is 3', async () => {
    const q = { validatorID: 1 }
    const completedMissions = await service.fetchMissionResult(q)
    const missionsResult = completedMissions.map(mission => {
      return mission.isCompleted
    })
    expect(missionsResult).toEqual([true, true, true, false, false, false, false, false])
  })
})
