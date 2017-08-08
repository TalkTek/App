import { handleActions } from 'redux-actions'

const initState = {
  lastKey: null
}

export default handleActions({
  'CP_LASTKEY': (state, action) => ({
    ...state,
    lastKey: action.payload.lastKey
  })
}, initState)
