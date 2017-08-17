import createReducder from '../../lib/configureReducer'

const initState = {
  viewInfo: {
    offset: {
      x: 0,
      y: 0
    }
  },
  audiosource: 'remote'
}

export default createReducder({
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
  },
  'SET_AUDIOSOURCE': (state, {payload}) => {
    return {
      ...state,
      audiosource: payload.source
    }
  }
}, initState)
