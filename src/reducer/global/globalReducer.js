import {
  handleActions
} from 'redux-actions'

const initState = {
  viewInfo: {
    offset: {
      x: 0,
      y: 0
    }
  }
}

export default handleActions({
  'SETTING_VIEW_OFFSET': (state, action) => {
    return {
      ...state,
      viewInfo: {
        ...state.viewInfo,
        offset: {
          x: action.payload.x,
          y: action.payload.y
        }
      }
    }
  }
}, initState)
