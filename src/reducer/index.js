// @flow

import { combineReducers } from 'redux'
import nav from './navigator/navigatorReducer'
import audio from './audio/audioReducer'
import member from './member/memberReducer'
import global from './global/globalReducer'

export default combineReducers({
  nav,
  audio,
  member,
  global
})
