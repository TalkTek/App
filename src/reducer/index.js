// @flow

import { combineReducers } from 'redux'
import audio from './audio/audioReducer'
import member from './member/memberReducer'
import capsule from './capsule/capsuleReducer'
import download from './download/downloadReducer'

export default combineReducers({
  audio,
  member,
  capsule,
  download
})
