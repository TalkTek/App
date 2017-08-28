import capsuleActions from '../capsuleAction'
import { LOAD_CP_AUDIO } from '../capsuleTypes'

describe('capsuleAcrions', () => {
  it('should create action with LOAD_CP_AUDIO', () => {
    const payload = {
      lastKey: 'id',
      limitToLast: 2
    }
    expect(capsuleActions.loadCpAudio(payload)).toEqual({
      payload,
      type: LOAD_CP_AUDIO
    })
  })
})
