import firebase from 'firebase'

export default class Firebase {
  firebase = null

  constructor() {
    this.firebase = new firebase()  
  }
}
