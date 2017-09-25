import firebase from 'firebase'
import CONFIG from './config'

if (__DEV__) {
  firebase.initializeApp(CONFIG.FIREBASE.DEV)
} else {
  firebase.initializeApp(CONFIG.FIREBASE.PRODUCTION)
}

export const database = firebase.database()
export const auth = firebase.auth()
// export const storage = firebase.storage()
