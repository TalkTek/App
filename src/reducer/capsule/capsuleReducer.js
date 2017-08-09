import { handleActions } from 'redux-actions'
import {
  CP_LASTKEY
} from './capsuleTypes'

const initState = {
  lastKey: null
}

export default handleActions({
  [CP_LASTKEY]: (state, action) => ({
    ...state,
    lastKey: action.payload.lastKey
  })
}, initState)
