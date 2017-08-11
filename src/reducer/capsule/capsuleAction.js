import { createActions } from 'redux-actions'
import {
  LOAD_CP_AUDIO,
  CAPSULE_SET_LASTKEY,
  CAPSULE_STORE
} from './capsuleTypes.js'

export default createActions({
  [LOAD_CP_AUDIO]: state => state,
  [CAPSULE_SET_LASTKEY]: state => state,
  [CAPSULE_STORE]: state => state
})
