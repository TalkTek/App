import FirebaseDB from './Firebase'

export default class CapsuleModule extends FirebaseDB {
  async loadLimit (limit = 1) {
    let db = this.database
      .ref('capsules')
      .limitToLast(limit)
      .orderByKey()

    return this.readOnce(db)
  }

  async loadLimitWithLastKey (limit = 1, lastKey) {
    let db = this.database
      .ref('capsules')
      .endAt(lastKey)
      .limitToLast(limit)
      .orderByKey()

    return this.readOnce(db)
  }
}
