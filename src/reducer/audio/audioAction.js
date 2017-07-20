import {
  createActions
} from 'redux-actions'
import firebase from 'firebase'

export default createActions({
  'CHANGE_PLAYING_STATE': playState => playState,
  'STORE_CAPSULE_AUDIOS': audios => audios,
  'SETTING_PLAYING_AUDIO_INFO': (
    name,
    length,
    currentTime,
    url,
    pos,
    from,
    id,
    parentKey
  ) => ({
    name,
    length,
    currentTime,
    url,
    pos,
    from,
    id,
    parentKey
  }),
  'LOAD_CP_AUDIO_SUCCESS': state => state,
  'CP_AUDIO_GOOD': (capsulesId, parentKey, userId) => {
    firebase.database()
      .ref(`users/${userId}/favorite/${capsulesId}`)
      .set({
        parentKey
      })
      firebase.database()
        .ref(`capsules/${parentKey}/audios/${capsulesId}`)
        .once('value')
        .then((audios) => {
        let audio = audios.val()
        if (!audio.counter) {
          audio.counter = 1
        } else {
          audio.counter ++
        }
        audios.ref.update(audio)  
      })
    return 
  },
  'CP_AUDIO_NOT_GOOD': (capsulesId, parentKey, userId) => {
    firebase.database()
      .ref(`users/${userId}/favorite/${capsulesId}`)
      .remove()
    firebase.database()
      .ref(`capsules/${parentKey}/audios/${capsulesId}`)
      .once('value')
      .then((audios) => {
        let audio = audios.val()
        if (!audio.counter) {
          audio.counter = 0
        } else {
          audio.counter --
        }
        audios.ref.update(audio)
      })
    return
  }
})
