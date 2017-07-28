import Firebase from 'firebase'

export default class FirebaseDB {
  database = Firebase.database()
  storage = Firebase.storage()


  /**
   * write data from path
   * @param {string} path
   * @param {*} value
   * @return {Promise}
   */
  write(path = '', value) {
    return this.database.ref(`${path}`).set(value)
  }

  /**
   * update data from path
   * @param {string} path
   * @param {*} value
   * @return {Promise} 
   */
  update(path = '', value) {
    return this.database.ref(`${path}`).update(value)
  }

  async _read(path) {
    return await this.database.ref(`${path}`).once('value')
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
    return this.database.ref(path).remove()
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

  // /**
  //  * download audio file by downloadUrl
  //  * @param {string} path
  //  * @return {Promise}
  //  */
  // async download(path= '') {
  //   this.storage.ref(path).getDownloadURL(url => {
  //
  //   })
  // }
}
