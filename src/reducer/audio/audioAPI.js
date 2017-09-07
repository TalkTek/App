import FirebaseDB from '../../api/Firebase'

class AudioAPI extends FirebaseDB {
  setLike = (parentKey, capsuleId, likeCounter) => {
    let path = `capsules/${parentKey}/audios/${capsuleId}`
    this.update(path, {
      likeCounter: likeCounter
    })
  }

  removeLike = (parentKey, capsuleId, likeCounter) => {
    let path = `capsules/${parentKey}/audios/${capsuleId}`
    this.update(path, {
      likeCounter: likeCounter
    })
  }
}

const audioAPI = new AudioAPI()

export default audioAPI
