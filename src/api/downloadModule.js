import RNFetchBlob from 'react-native-fetch-blob'
import '../lib/global'
export default class DownlaodModule {
  /**
   * download audio to cache and save its path to local storage
   * @param {object} audio
   */
  async downloadAudio (audio) {
    console.log(audio)
    let res = await RNFetchBlob
      .config({
        fileCache: true,
        appendExt: 'mp3'
      })
      .fetch('GET', audio.url, {
      })
      .progress((received, total) => {
        console.log('progress', received / total)
      })
    const path = 'file://' + res.path()
    let newaudio = {
      ...audio,
      url: path,
      active: false
    }

    global.storageGlobal.save({
      key: 'capsule-audio',
      id: newaudio.id,
      data: newaudio
    })
    console.log(res.path())
    return path
  }
/**
 * get downloaded capsules
 */
  async getDownloadedCapsules () {
    let capsules = await global.storageGlobal.getAllDataForKey('capsule-audio')
    let capsuleobject = {}
    let childobject = {}
    for (let i = 0; i < capsules.length; i++) {
      childobject[capsules[i].id] = capsules[i]
    }
    for (let childKey in childobject) {
      capsuleobject[childobject[childKey].parentKey] = {
        ...capsuleobject[childobject[childKey].parentKey],
        audios: {},
        title: childobject[childKey].title
      }
    }
    for (let childKey in childobject) {
      capsuleobject[childobject[childKey].parentKey].audios = {
        ...capsuleobject[childobject[childKey].parentKey].audios,
        [childKey]: childobject[childKey]
      }
    }
    console.log(capsuleobject)
    return capsuleobject
  }
/**
 * given an id, it will look it up in local storage
 *
 * retrun true if it find it
 */
  async getDownloadedCapsulesID (id) {
    let capsulesID = await global.storageGlobal.getIdsForKey('capsule-audio')
    if (capsulesID.find((capsuleid) => { return capsuleid === id }) === undefined) return false
    else return true
  }
  /**
   * given an id, it will look it up in local storage, then
   */
  removeCapsuleFromStorage (id) {
    global.storageGlobal.remove({
      key: 'capsule-audio',
      id: id.childKey
    })
  }
  
  removeCapsuleFromCache (path) {
    RNFetchBlob.fs.unlink(path.slice(0, 6))
  }
}
