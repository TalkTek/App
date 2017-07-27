import Firebase from 'firebase'

export default class FirebaseDB {
  firebase = Firebase.database()

  /**
   * write data from path
   * @param {string} path
   * @param {*} value
   * @return {Promise}
   */
  write(path = '', value) {
    return this.firebase.ref(`${path}`).set(value)
  }

  /**
   * update data from path
   * @param {string} path
   * @param {*} value
   * @return {Promise} 
   */
  update(path = '', value) {
    return this.firebase.ref(`${path}`).update(value)
  }

  async _read(path) {
    return await this.firebase.ref(`${path}`).once('value')
  }

  /**
   * read data from path 
   * @param {string} path 
   * @return {Promise}
   */
  async readOnce(path = '') {
    let data = await this._read(path)
    return data.val()
  }

  /**
   * delete data from path
   * @param {string} path
   * @return {Promise}
   */
  remove(path = '') {
    return this.firebase.ref(path).remove()
  }

  /**
   * check ref path is exists
   * @param {string} path
   * @return {Promise} 
   */
  async exists(path = '') {
    let snapshot = await this._read(path)
    return snapshot.exists()
  }
}