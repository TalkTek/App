// @flow

import { combineReducers } from 'redux'
import nav from './navigator/navigatorReducer'
import audio from './audio/audioReducer'
import member from './member/memberReducer'

export default combineReducers({
  nav,
  audio,
  member
})
