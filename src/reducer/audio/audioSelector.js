import {
  createSelector
} from 'reselect'

// export const getAudio = state

export const selectAudioStateFromReduxStore = state => state.audio
//
const playingAudioState = () => createSelector(
  selectAudioStateFromReduxStore,
  audioState => audioState.playingAudioInfo
)

export {
  playingAudioState
}
