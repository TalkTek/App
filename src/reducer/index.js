// @flow

import { combineReducers } from 'redux'
import audio from './audio/audioReducer'
import member from './member/memberReducer'
import capsule from './capsule/capsuleReducer'

export default combineReducers({
  audio,
  member,
  global,
  capsule
})
