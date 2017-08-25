import {
  createSelector
} from 'reselect'

const getAudioState = state => state.audio

const getCapsules = (parentKey, childKey) => createSelector(
  getAudioState,
  audioState => {
    return audioState.capsules[parentKey].audios[childKey]
  }
)

const getPreviousKey = () => createSelector(
  getAudioState,
  audioState => {
    return audioState.previousKey
  }
)

const getIsPlayedInfo = () => createSelector(
  getAudioState,
  audioState => {
    return audioState.isPlayed
  }
)

export {
  getCapsules,
  getPreviousKey,
  getIsPlayedInfo
}
