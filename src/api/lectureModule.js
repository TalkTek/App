import Firebase from './Firebase'

export default class LectureModule extends Firebase {
  async load (id) {
    let db = this.database
      .ref(`lectures/${id}`)
      .orderByKey()

    let data = await this.readOnce(db)
    return data
  }
}
