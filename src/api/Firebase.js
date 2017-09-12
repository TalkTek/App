import {
  database
} from '../lib/firebase'

export default class FirebaseDB {
  database = database
  /**
   * write data from path
   * @param {string} path
   * @param {*} value
   * @return {Promise}
   */
  write (path = '', value) {
    return database.ref(path).set(value)
  }

  /**
   * update data from path
   * @param {string} path
   * @param {*} value
   * @return {Promise}
   */
  update (path = '', value) {
    return database.ref(path).update(value)
  }

  _read (path) {
    return database.ref(`${path}`).once('value')
  }

  updateSpecificField (path = '', value) {
    try {
      return database.ref(`${path}`).updateChildValues(value)
    } catch (error) {
      throw new Error(error)
    }
  }

  /**
   * read data from path
   * @param {string/firebase db} path
   * @return {Promise}
   */
  async readOnce (path = '') {
    let data

    if (typeof path === 'object') {
      data = await path.once('value')
    } else {
      data = await this._read(path)
    }
    return data.val()
  }

  /**
   * delete data from path
   * @param {string} path
   * @return {Promise}
   */
  remove (path = '') {
    return database.ref(path).remove()
  }

  /**
   * check ref path is exists
   * @param {string} path
   * @return {Promise}
   */
  async exists (path = '') {
    let snapshot = await this._read(path)
    return snapshot.exists()
  }

  /**
   * push a new post to the path
   * @param {string} path
   * @param {*} value
   * @return {Promise}
   */

  push (path = '', value) {
    let newKey = database.ref(path).push().key
    return this.update(`${path}/${newKey}`, value)
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
