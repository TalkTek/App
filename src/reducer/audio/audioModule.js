import firebase from 'firebase'

export default {
  cpAudioGood: async (capsulesId, parentKey, userId) => {
    let audio
    firebase.database()
      .ref(`users/${userId}/favorite/${capsulesId}`)
      .set({
        parentKey
      })
    let audios = 
      await firebase.database()
        .ref(`capsules/${parentKey}/audios/${capsulesId}`)
        .once('value')
    
    audio = audios.val()
    
    if (!audio.likeCounter) {
      audio.likeCounter = 1
    } else {
      audio.likeCounter ++
    }
    audios.ref.update(audio)

    return audio.likeCounter
  },
  cpAudioNotGood: async(capsulesId, parentKey, userId) => {
    let audio
    firebase.database()
      .ref(`users/${userId}/favorite/${capsulesId}`)
      .remove()
    let audios = 
      await firebase.database()
        .ref(`capsules/${parentKey}/audios/${capsulesId}`)
        .once('value')
    
    audio = audios.val()
    if (!audio.likeCounter) {
      audio.likeCounter = 0
    } else {
      audio.likeCounter --
    }
    audios.ref.update(audio)

    return audio.likeCounter
  }
}
