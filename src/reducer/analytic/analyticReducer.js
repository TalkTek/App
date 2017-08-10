import createReducder from '../../lib/configureReducer'
import {
  GA_SET_SCREEN,
  GA_SET_EVENT
} from './analyticTypes.js'

type analyticTypes = {
  screen: string,
  event: {}
}

const initialState : analyticTypes

export default createReducder({
  [GA_SET_SCREEN]: (state, action) => ({
    ...state,
    screen: action.payload
  }),
  [GA_SET_EVENT]: (state, action) => ({
    ...state,
    event: action.payload
  })
}, initialState)
