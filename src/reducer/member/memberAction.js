import {
  createActions
} from 'redux-actions'
import firebase from 'firebase'

export default createActions({
  'CHANGE_MEMBER_STATE': memberState => memberState,
  'LOGOUT_MEMBER': async () => {
    await firebase.auth().signOut()
    return null
  },
  'SAVE_MEMBER_CHANGE': memberState => {
    firebase.database().ref(`users/${memberState.memberUid}/profile`)
      .once('value')
      .then(async snapshot => {
        let data = snapshot.val()
        await firebase.database().ref(`users/${memberState.memberUid}/profile`)
          .set(Object.assign(data, memberState.post))    
      })

    return memberState.post
  },
  'MEMBER_CAPSULE_GET': state => state,
  'MEMBER_CAPSULE_GET_SUCCESS': state => state
})
