import firebase from './firebase'

export default class FirebaseDB extends firebase {
  
  /**
   * write data from path
   * @param {string} path
   * @param {*} value
   * @return {Promise}
   */
  write(path = '', value) {
    return this.firebase.database().ref(`${path}`).set(value)
  }

  /**
   * update data from path
   * @param {string} path
   * @param {*} value
   * @return {Promise} 
   */
  update(path = '', value) {
    return this.firebase.database().ref(`${path}`).update(value)
  }

  /**
   * read data from path 
   * @param {string} path 
   * @return {Promise}
   */
  readOnce(path = '') {
    return this.firebase.database().ref(`${path}`).once('value')
  }
}
