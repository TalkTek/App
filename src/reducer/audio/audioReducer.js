import { handleActions } from 'redux-actions'

const initialState = {
  playState: 'notPlaying',
  capsules: [],
  playingAudioInfo: {
    audioName: '',
    audioLength: '',
    audioUrl: ''
  },
  audioPos: {
    i: '',
    j: ''
  },
  audioCurrentTime: {
    sec: null,
    formatted: null
  }
}

export default handleActions({
  'CHANGE_PLAYING_STATE': (state, action) => {
    return {
      ...state,
      playState: action.payload
    }
  },
  'STORE_CAPSULE_AUDIOS': (state, action) => {
    return {
      ...state,
      capsules: state.capsules.concat(action.payload)
    }
  },
  'SETTING_PLAYING_AUDIO_INFO': (state, action) => {
    return {
      ...state,
      playingAudioInfo: {
        audioName: action.payload.audioName,
        audioLength: action.payload.audioLength,
        audioUrl: action.payload.audioUrl,
        timeToPlaying: action.payload.audioPlayingTimer
      }
    }
  },
  'SETTING_NEW_AUDIO_POS': (state, action) => {
    return {
      ...state,
      audioPos: {
        i: action.payload.i,
        j: action.payload.j
      }
    }
  },
  'SETTING_AUDIO_PLAYING_TIME': (state, action) => {
    return {
      ...state,
      audioCurrentTime: {
        sec: action.payload.sec,
        formatted: action.payload.formatted
      }
    }
  }
}, initialState)
