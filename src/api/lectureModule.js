import FirebaseDB from './lib/FirebaseDB'

export default class LectureModule extends FirebaseDB {
  async load (id) {
    let db = this.database
      .ref(`lectures/${id}`)
      .orderByKey()

    let data = await this.readOnce(db)
    return data
  }
}
