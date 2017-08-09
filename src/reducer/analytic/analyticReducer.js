import { handleActions } from 'redux-actions'
import {
  GA_SET_SCREEN,
  GA_SET_EVENT
} from './analyticTypes.js'

const initialState = {
  screen: '',
  event: {}
}

export default handleActions({
  [GA_SET_SCREEN]: (state, action) => ({
    ...state,
    screen: action.payload
  }),
  [GA_SET_EVENT]: (state, action) => ({
    ...state,
    event: action.payload
  })
}, initialState)
