import {
  CAPSULE_SET_LASTKEY,
  CAPSULE_STORE
} from './capsuleTypes'
import createReducder from '../../lib/configureReducer'

const initState = {
  lastKey: null
}

export default createReducder({
  [CAPSULE_STORE]: (state, action) => {
    return {
      ...state,
      capsules: state.capsules.concat(action.payload)
    }
  },
  [CAPSULE_SET_LASTKEY]: (state, action) => ({
    ...state,
    lastKey: action.payload.lastKey
  })
}, initState)
