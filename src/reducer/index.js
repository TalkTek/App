// @flow

import { combineReducers } from 'redux'
import nav from './navigator/navigatorReducer'
import global from './global/globalReducer'

export default combineReducers({
  nav,
  global
})
