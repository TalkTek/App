// @flow

import { combineReducers } from 'redux'
import nav from './navigator/navigatorReducer'
import audio from './audio/audioReducer'

export default combineReducers({
  nav,
  audio
})
