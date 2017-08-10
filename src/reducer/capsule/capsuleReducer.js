// @flow
import {
  CAPSULE_SET_LASTKEY,
  CAPSULE_STORE
} from './capsuleTypes'
import createReducder from '../../lib/configureReducer'

type capsuleStoreType = {
  lastKey: string|null
}

const initState = {
  lastKey: null
}

export default createReducder({
  [CAPSULE_STORE]: (state: Object, action: Object) => {
    return {
      ...state,
      capsules: state.capsules.concat(action.payload)
    }
  },
  [CAPSULE_SET_LASTKEY]: (state: Object, action: Object) => ({
    ...state,
    lastKey: action.payload.lastKey
  })
}, initState)
