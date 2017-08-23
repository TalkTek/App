import {
  createSelector
} from 'reselect'

const selectAudioStateFromReduxStore = state => state.audio
//
const getCapsules = (parentKey, childKey) => createSelector(
  selectAudioStateFromReduxStore,
  audioState => {
    return audioState.capsules[parentKey].audios[childKey]
  }
)

export {
  getCapsules
}
