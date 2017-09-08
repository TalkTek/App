// @flow

import { combineReducers } from 'redux'
import nav from './navigator/navigatorReducer'
import audio from './audio/audioReducer'
import member from './member/memberReducer'
import global from './global/globalReducer'
import capsule from './capsule/capsuleReducer'
import download from './download/downloadReducer'

export default combineReducers({
  nav,
  audio,
  member,
  global,
  capsule,
  download
})
