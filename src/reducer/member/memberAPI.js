import FirebaseDB from '../../api/Firebase'

class MemberAPI extends FirebaseDB {
  setFavoriteCapsule = (memberUid, capsuleId, parentKey) => {
    let path = `users/${memberUid}/favorite/${capsuleId}/`
    this.write(path, {
      parentKey
    })
  }

  removeFavoriteCapsule = (memberUid, capsuleId) => {
    let path = `users/${memberUid}/favorite/${capsuleId}`
    this.remove(path)
  }
}

const memberAPI = new MemberAPI()

export default memberAPI