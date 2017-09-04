import createReducder from '../../lib/configureReducer'

/* eslint-disable*/
import {
  CP_AUDIO_INFO_GET,
  CP_AUDIO_INFO_GET_SUCCESS,
  CP_AUDIO_GOOD_CHANGE,
  CP_AUDIO_GOOD_CHANGE_SUCCESS,
  CP_AUDIO_GET_DOC,
  CP_AUDIO_GET_DOC_SUCCESS,
  CP_AUDIO_STORE,
  SETTING_PLAYING_AUDIO_INFO,
  LOAD_CP_AUDIO_SUCCESS,
  TOGGLE_AUDIO_POPOUT_BAR,
  SHOW_AUDIO_POPOUT_BAR,
  HIDE_AUDIO_POPOUT_BAR,
  AUDIO_LOAD,
  AUDIO_PAUSE,
  AUDIO_UPDATE_INFO,
  // --------R.Start----------
  SAVE_PLAYING_AUDIO_STATIC_INFO_SUCCESS,
  UPDATE_CURRENT_TIME_SUCCESS,
  ON_PRESS_SUCCESS,
  AUDIO_PLAY_SUCCESS,
  AUDIO_PAUSE_SUCCESS,
  REMOVE_COLOR_SUCCESS,
  ADD_COLOR_SUCCESS,
  SAVE_PREVIOUS_KEY_SUCCESS,
  PLAY_SUCCESS,
  PAUSE_SUCCESS,
} from './audioTypes'
/* eslint-disable*/

const initialState = {
  isPlayed: false, // user already play audio or not ?
  isPlaying: false,
  capsules: {},
  isCpAudioLoaded: false,
  previousKey:{
    father: '',
    child: '',
  },
  playingAudioStaticInfo: {
    active: '',
    audioName: '',
    draft: '',
    id: '',
    length: {
      formatted: '',
      sec: ''
    },
    likeCounter: '',
    url: '',
    parentKey: ''
  },
  playingAudioDynamicInfo: {
    currentTime: {
      formatted: '',
      sec: ''
    }
  },
  isAudioPopOutBarActive: false
}

export default createReducder({
  [CP_AUDIO_STORE]: (state, action) => {
    return {
      ...state,
      capsules: {
        ...state.capsules,
        ...action.payload
      }
    }
  },
  [SAVE_PLAYING_AUDIO_STATIC_INFO_SUCCESS]: (state, action) => {
    return {
      ...state,
      playingAudioStaticInfo: {
        ...state.playingAudioStaticInfo,
        ...action.payload.capsule,
      }
    }
  },
  [SAVE_PREVIOUS_KEY_SUCCESS]: (state, action) => {
    return {
      ...state,
      previousKey: {
        father: action.payload.parentKey,
        child: action.payload.childKey,
      }
    }
  },
  [ADD_COLOR_SUCCESS]: (state, action) => {
    let parentKey = action.payload.parentKey
    let childKey = action.payload.childKey
    let finalCapsules = {
      audios: {
        ...state.capsules[parentKey].audios,
        [childKey]: {
          ...state.capsules[parentKey].audios[childKey],
          active: true
        }
      },
      title: state.capsules[parentKey].title,
    }
    return {
      ...state,
      capsules: {
        ...state.capsules,
        [parentKey]: finalCapsules
      }
    }
  },
  [REMOVE_COLOR_SUCCESS]: (state, action) => {
    let parentKey = action.payload.parentKey
    let childKey = action.payload.childKey
    let finalCapsules = {
      audios: {
        ...state.capsules[parentKey].audios,
        [childKey]: {
          ...state.capsules[parentKey].audios[childKey],
          active: false
        }
      },
      title: state.capsules[parentKey].title,
    }
    return {
      ...state,
      capsules: {
        ...state.capsules,
        [parentKey]: finalCapsules
      }
    }
  },
  [ON_PRESS_SUCCESS]: (state, action) => {
    return {
      ...state,
      isPlayed: true
    }
  },
  [UPDATE_CURRENT_TIME_SUCCESS]: (state, action) => {
    return {
      ...state,
      playingAudioDynamicInfo: {
        currentTime: {
          formatted: action.payload.currentTimeFormatted,
          sec: action.payload.currentTimeSec
        }
      }
    }
  },
  [LOAD_CP_AUDIO_SUCCESS]: (state, action) => {
    return {
      ...state,
      isCpAudioLoaded: true
    }
  },
  [SHOW_AUDIO_POPOUT_BAR]: (state) => {
    return {
      ...state,
      isAudioPopOutBarActive: true,
    }
  },
  [HIDE_AUDIO_POPOUT_BAR]: (state) => {
    return {
      ...state,
      isAudioPopOutBarActive: false,
    }
  },
  [PLAY_SUCCESS]: (state, action) => {
    return {
      ...state,
      isPlaying: true,
    }
  },
  [PAUSE_SUCCESS]: (state, action) => {
    return {
      ...state,
      isPlaying: false
    }
  }
}, initialState)
