import { handleActions } from 'redux-actions'

const initialState = {
  playState: 'notPlaying'
}

export default handleActions({
  'CHANGE_PLAYING_STATE': (state, action) => {
    return {
      ...state,
      playState: action.payload
    }
  }}
, initialState)
