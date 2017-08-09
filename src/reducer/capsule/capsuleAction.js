import { createActions } from 'redux-actions'
import {
  LOADING_CP,
  CP_LASTKEY
} from './capsuleTypes.js'

export default createActions({
  [LOADING_CP]: state => state,
  [CP_LASTKEY]: state => state
})
