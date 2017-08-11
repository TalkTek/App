import createReducder from '../../lib/configureReducer'

/* eslint-disable*/
import {
  CP_AUDIO_INFO_GET,
  CP_AUDIO_INFO_GET_SUCCESS,
  CP_AUDIO_GOOD_CHANGE,
  CP_AUDIO_GOOD_CHANGE_SUCCESS,
  CP_AUDIO_GET_DOC,
  CP_AUDIO_GET_DOC_SUCCESS,
  CHANGE_PLAYING_STATE,
  CP_AUDIO_STORE,
  SETTING_PLAYING_AUDIO_INFO,
  LOAD_CP_AUDIO_SUCCESS,
  TOGGLE_AUDIO_POPOUT_BAR
} from './audioTypes'
/* eslint-disable*/

type AudioStateType = {
  isPlaying: boolean,
  capsules: [],
  isCpAudioLoaded: boolean,
  playingAudioInfo: {
    draft: '',
    likeCounter: number,
    audioIsGood: boolean,
    parentKey: string,
    capsulesId: string,
    name: string,
    length: {
      sec?: number,
      formatted: string 
    },
    currentTime: {
      sec?: number,
      formatted: string
    },
    url: string,
    pos: {
      i: string,
      j: string
    },
    from: string
  }
}

const initialState = {
  playState: 'notPlaying',
  capsules: [],
  isCpAudioLoaded: false,
  playingAudioInfo: {
    draft: '',
    likeCounter: 0,
    audioIsGood: false,
    parentKey: '',
    capsulesId: '',
    name: '',
    length: {
      sec: null,
      formatted: ''
    },
    currentTime: {
      sec: null,
      formatted: ''
    },
    url: '',
    pos: {
      i: '',
      j: ''
    },
    from: ''
  },
  isAudioPopOutBarActive: false
}

export default createReducder({
  [CHANGE_PLAYING_STATE]: (state, action) => {
    return {
      ...state,
      playState: action.payload
    }
  },
  [CP_AUDIO_STORE]: (state, action) => {
    return {
      ...state,
      capsules: state.capsules.concat(action.payload)
    }
  },
  [SETTING_PLAYING_AUDIO_INFO]: (state, action) => {
    return {
      ...state,
      playingAudioInfo: {
        ...state.playingAudioInfo,
        likeCounter: action.payload.likeCounter || state.playingAudioInfo.likeCounter || 0,
        parentKey: action.payload.parentKey || state.playingAudioInfo.parentKey,
        capsulesId: action.payload.id || state.playingAudioInfo.capsulesId,
        name: action.payload.name,
        length: {
          sec: action.payload.length.sec,
          formatted: action.payload.length.formatted
        },
        currentTime: {
          sec: action.payload.currentTime.sec,
          formatted: action.payload.currentTime.formatted
        },
        url: action.payload.url,
        pos: {
          i: action.payload.pos.i,
          j: action.payload.pos.j
        },
        from: action.payload.from
      }
    }
  },
  [CP_AUDIO_INFO_GET_SUCCESS]: (state, action) => {
    if (action.payload)
      return {
        ...state,
        playingAudioInfo: {
          ...state.playingAudioInfo,
          audioIsGood: action.payload.audioIsGood,
          likeCounter: action.payload.likeCounter,
          parentKey: action.payload.parentKey || state.playingAudioInfo.parentKey,
          capsulesId: action.payload.id || state.playingAudioInfo.capsulesId,
          name: action.payload.audioName,
          url: action.payload.url
        }
      }
    return state
  },
  [LOAD_CP_AUDIO_SUCCESS]: (state, action) => {
    return {
      ...state,
      isCpAudioLoaded: true
    }
  },
  [CP_AUDIO_GOOD_CHANGE_SUCCESS]: (state, action) => {
    return {
      ...state,
      playingAudioInfo: {
        ...state.playingAudioInfo,
        audioIsGood: action.payload.isGood,
        likeCounter: state.playingAudioInfo.likeCounter + (action.payload.isGood ? 1: -1)
      }
    }
  },
  [CP_AUDIO_GET_DOC_SUCCESS]: (state, { payload: draft }) => ({
    ...state,
    playingAudioInfo: {
      ...state.playingAudioInfo,
      draft: draft.draft
    }
  }),
  [TOGGLE_AUDIO_POPOUT_BAR]: (state, action) => {
    return {
      ...state,
      isAudioPopOutBarActive: !state.isAudioPopOutBarActive,
    }
  }
}, initialState)
