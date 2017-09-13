import createReducder from '../../lib/configureReducer'

/* eslint-disable*/
import {
  CP_AUDIO_INFO_GET,
  CP_AUDIO_INFO_GET_SUCCESS,
  CP_AUDIO_GOOD_CHANGE,
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
  UPDATE_CP_AUDIO_ISDOWNLOADED_SUCCESS,
  
  SET_LIKE_EVALUATION_ON_CAPSULE_SUCCESS,
  REMOVE_LIKE_EVALUATION_ON_CAPSULE_SUCCESS,

  SET_AUDIO_SOURCE_SUCCESS
} from './audioTypes'

import {
  DOWNLOAD_CP_AUDIO_SUCCESS,
  GET_DOWNLOADED_CP_AUDIO_SUCCESS,
  REMOVE_DOWNLOADED_CP_AUDIO_SUCCESS
} from '../download/downloadTypes'

import { getAudioCapsules } from './audioSelector'
/* eslint-disable*/

const initialState = {
  isPlayed: false, // user already play audio or not ?
  isPlaying: false,
  capsules: {},
  downloadedcapsules: {},
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
    url: '',
    parentKey: '',
    likeCounter: 0,
  },
  playingAudioDynamicInfo: {
    currentTime: {
      formatted: '',
      sec: '',
    },
  },
  isAudioPopOutBarActive: false,
  audioSource: 'local'
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
  [REMOVE_LIKE_EVALUATION_ON_CAPSULE_SUCCESS]: (state, action) => {
    return {
      ...state,
      playingAudioStaticInfo: {
        ...state.playingAudioStaticInfo,
        likeCounter: state.playingAudioStaticInfo.likeCounter - 1
      }
    }
  },
  [SET_LIKE_EVALUATION_ON_CAPSULE_SUCCESS]: (state, action) => {
    return {
      ...state,
      playingAudioStaticInfo: {
        ...state.playingAudioStaticInfo,
        likeCounter: state.playingAudioStaticInfo.likeCounter + 1
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
    let targetCapsules = state.audioSource === 'remote' ? state.capsules : state.downloadedcapsules
    let finalCapsules = {
      audios: {
        ...targetCapsules[parentKey].audios,
        [childKey]: {
          ...targetCapsules[parentKey].audios[childKey],
          active: true
        }
      },
      title: targetCapsules[parentKey].title,
    }
    if(state.audioSource === 'remote'){
      return {
        ...state,
        capsules: {
          ...targetCapsules,
          [parentKey]: finalCapsules
        }
      }
    }
    else{
      return {
        ...state,
        downloadedcapsules: {
          ...targetCapsules,
          [parentKey]: finalCapsules
        }
      }
    }
  },
  [REMOVE_COLOR_SUCCESS]: (state, action) => {
    let parentKey = action.payload.parentKey
    let childKey = action.payload.childKey
    let targetCapsules = state.audioSource === 'remote' ? state.capsules : state.downloadedcapsules
    let finalCapsules = {
      audios: {
        ...targetCapsules[parentKey].audios,
        [childKey]: {
          ...targetCapsules[parentKey].audios[childKey],
          active: false
        }
      },
      title: targetCapsules[parentKey].title,
    }
    if(state.audioSource === 'remote'){
      return {
        ...state,
        capsules: {
          ...targetCapsules,
          [parentKey]: finalCapsules
        }
      }
    }
    else{
      return {
        ...state,
        downloadedcapsules: {
          ...targetCapsules,
          [parentKey]: finalCapsules
        }
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
        ...state.playingAudioDynamicInfo,
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
  },
  [UPDATE_CP_AUDIO_ISDOWNLOADED_SUCCESS]: (state, {payload}) => {
    const {parentKey, id, isdownloaded} = payload

    // console.log(state)
    let capsules = Object.assign({}, state.capsules)
    console.log(capsules)
    capsules[parentKey].audios[id].downloaded = isdownloaded
    // if(url === null) {
    //   console
    //   capsules[parentKey].audios[payload.childKey].url = capsules[parentKey].audios[payload.childKey].downloaded
    //   capsules[parentKey].audios[payload.childKey].downloaded = null
    // }
    // else {
    //   capsules[parentKey].audios[id].downloaded = capsules[parentKey].audios[id].url
    //   capsules[parentKey].audios[id].url = url
    // }
    return {
      ...state,
      capsules
    }
  },
  [DOWNLOAD_CP_AUDIO_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      downloadedcapsules: payload.capsules
    }
  },
  [GET_DOWNLOADED_CP_AUDIO_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      downloadedcapsules: payload.capsules
    }
  },
  [REMOVE_DOWNLOADED_CP_AUDIO_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      downloadedcapsules: payload.capsules
    }
  },
  [SET_AUDIO_SOURCE_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      audioSource: payload
    }
  }
}, initialState)
