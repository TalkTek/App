import { handleActions } from 'redux-actions'

const initialState = {
  screen: '',
  event: {}
}

export default handleActions({
  'GA_SET_SCREEN': (state, action) => ({
    ...state,
    screen: action.payload
  }),
  'GA_SET_EVENT': (state, action) => ({
    ...state,
    event: action.payload
  })
}, initialState)
