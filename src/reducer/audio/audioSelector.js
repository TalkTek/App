import {
  createSelector
} from 'reselect'

const getAudioState = state => state.audio

const getMemberState = state => state.member

const getCapsule = (parentKey, childKey) => createSelector(
  getAudioState,
  audioState => {
    return audioState.capsules[parentKey].audios[childKey]
  }
)

const getCapsules = (parentKey = undefined) => createSelector(
  getAudioState,
  audioState => {
    return parentKey ? audioState.capsules[parentKey].audios : audioState.capsules
  }
)

const getLikeCounter = () => createSelector(
  getAudioState,
  audioState => {
    return audioState.playingAudioStaticInfo.likeCounter
  }
)

/**
 * use for the change of button's color, you need to know the key of the button
 * , by it, if user press new button, you can reset its color by the record
 */

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

const getCurrentTimeSec = () => createSelector(
  getAudioState,
  audioState => {
    return audioState.playingAudioDynamicInfo.currentTime.sec
  }
)

const getCurrentKey = () => createSelector(
  getAudioState,
  audioState => {
    return {
      parentKey: audioState.playingAudioStaticInfo.parentKey,
      childKey: audioState.playingAudioStaticInfo.id
    }
  }
)

const getPreviousKey = () => createSelector(
  getAudioState,
  audioState => {
    return audioState.previousKey
  }
)

export {
  getCapsule,
  getCapsules,
  getIsPlayedInfo,
  getAudioLengthBySec,
  isPlaying,
  getCurrentTimeSec,
  getCurrentKey,
  getPreviousKey,
  getMemberState,
  getLikeCounter
}
