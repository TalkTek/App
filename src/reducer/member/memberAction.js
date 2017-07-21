import {
  createActions
} from 'redux-actions'
import firebase from 'firebase'

export default createActions({
  'CHANGE_MEMBER_STATE': memberState => memberState,
  'LOGOUT_MEMBER': async () => {
    await firebase.auth().signOut()
    return null
  }
})
