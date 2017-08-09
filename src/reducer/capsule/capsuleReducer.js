import { handleActions } from 'redux-actions'
import {
  CP_LASTKEY,
  CAPSULE_STORE
} from './capsuleTypes'

const initState = {
  lastKey: null
}

export default handleActions({
  [CAPSULE_STORE]: (state, action) => {
    return {
      ...state,
      capsules: state.capsules.concat(action.payload)
    }
  },
  [CP_LASTKEY]: (state, action) => ({
    ...state,
    lastKey: action.payload.lastKey
  })
}, initState)
