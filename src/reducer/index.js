// @flow

import { combineReducers } from 'redux'
import nav from './navigator/navigatorReducer'
import audio from './audio/audioReducer'
import member from './member/memberReducer'
import analytic from './analytic/analyticReducer'

export default combineReducers({
  nav,
  audio,
  member,
  analytic
})
