import FirebaseDB from '../../api/Firebase'

export default class AudioAPI extends FirebaseDB {
  setPositive (parentKey, childKey, likeCounter) {
    let path = `capsules/${parentKey}/audios/${childKey}/likeCounter`
    this.updateSpecificField(path, likeCounter)
  }

  removePositive (parentKey, childKey, likeCounter) {
    let path = `capsules/${parentKey}/audios/${childKey}/likeCounter`
    this.updateSpecificField(path, likeCounter)
  }
}
