import {
  createSelector
} from 'reselect'

const getAudioState = state => state.audio

const getCapsulePath = (parentKey, childKey) => createSelector(
  getAudioState,
  audioState => {
    return audioState.capsules[parentKey].audios[childKey].url
  }
)

export {
  getCapsulePath
}
