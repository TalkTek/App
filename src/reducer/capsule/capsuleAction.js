import { createActions } from 'redux-actions'
import {
  CAPSULE_LOADING,
  CP_LASTKEY,
  CAPSULE_STORE
} from './capsuleTypes.js'

export default createActions({
  [CAPSULE_LOADING]: state => state,
  [CP_LASTKEY]: state => state,
  [CAPSULE_STORE]: state => state
})
