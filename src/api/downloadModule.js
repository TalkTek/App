import RNFetchBlob from 'react-native-fetch-blob'
import '../lib/global'
export default class DownlaodModule {
  async downloadAudio (audio) {
    console.log(audio)
    let res = await RNFetchBlob
      .config({
        // add this option that makes response data to be stored as a file,
        // this is much more performant.
        fileCache: true,
        appendExt: 'm4a'
      })
      .fetch('GET', audio.url, {
        // some headers ..
      })
      .progress((received, total) => {
        console.log('progress', received / total)
      })
    //   .then((res) => {
    //     // the temp file path
    //     console.log('The file saved to ', res.path())
    //   })
    audio.url = 'file://' + res.path()
    global.storageGlobal.save({
      key: 'capsule-audio',
      id: audio.id,
      data: audio
    })
    console.log(res.path())
    return res.path()
  }
  async getDownloadedCapsules () {
    let capsules = await global.storageGlobal.getAllDataForKey('capsule-audio')
    console.log(capsules)
    return capsules
  }
}
