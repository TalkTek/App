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

const getAudioLengthBySec = () => createSelector(
  getAudioState,
  audioState => {
    return audioState.playingAudioStaticInfo.length.sec
  }
)

const isPlaying = () => createSelector(
  getAudioState,
  audioState => {
    return audioState.isPlaying
  }
)

export {
  getCapsules,
  getPreviousKey,
  getIsPlayedInfo,
  getAudioLengthBySec,
  isPlaying
}
