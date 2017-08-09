import { createActions } from 'redux-actions'
import {
  GA_SET_SCREEN,
  GA_SET_EVENT
} from './analyticTypes.js'

export default createActions({
  [GA_SET_SCREEN]: state => state,
  [GA_SET_EVENT]: state => state
})
