import Firebase from '../../api/Firebase'

export default class LectureModule extends Firebase {
  async load (id) {
    let data = this.readOnce(`lectures/${id}/`)
    
    return data
  }
}
