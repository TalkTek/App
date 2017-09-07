import FirebaseDB from '../../api/Firebase'

class CapsuleAPI extends FirebaseDB {
  loadLimit = (limit = 1) => {
    let db = this.database
      .ref('capsules')
      .limitToLast(limit)
      .orderByKey()
    return this.readOnce(db)
  }

  loadLimitWithLastKey = (limit = 1, lastKey) => {
    let db = this.database
      .ref('capsules')
      .endAt(lastKey)
      .limitToLast(limit)
      .orderByKey()
    return this.readOnce(db)
  }
}

const capsuleAPI = new CapsuleAPI()

export default capsuleAPI