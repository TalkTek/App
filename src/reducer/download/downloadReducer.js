import {
  CP_AUDIO_DOWNLOAD,
  CP_AUDIO_DOWNLOAD_SUCCESS,
  CP_AUDIO_DOWNLOADED_INFO_GET,
  CP_AUDIO_DOWNLOADED_INFO_GET_SUCCESS,
  CP_AUDIO_DOWNLOADED_REMOVE,
  CP_AUDIO_DOWNLOADED_REMOVE_SUCCESS
} from './downloadTypes.js'
import createReducder from '../../lib/configureReducer'

const initState = {
  capsules: []
}

export default createReducder({
  [CP_AUDIO_DOWNLOAD_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      capsules: payload.capsules
    }
  },
  [CP_AUDIO_DOWNLOADED_INFO_GET_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      capsules: payload.capsules
    }
  },
  [CP_AUDIO_DOWNLOADED_REMOVE_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      capsules: payload.capsules
    }
  }
}, initState)
