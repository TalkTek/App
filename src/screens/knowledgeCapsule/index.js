// @flow
'use strict'

import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'
import firebase from 'firebase'
import AudioUnit from '../../components/AudioUnit'

export default class KnowledgeCapsule extends Component {

  componentWillMount () {
    let capsuleRef = firebase.database().ref('capsule').limitToLast(10)
    capsuleRef
      .once('value', (snapshot) => {
        console.log('value is', snapshot.val())
      })
      .catch(error => console.warn('error: get capsule data from firebase. message is: ', error))
  }

  render () {
    return (
      <AudioUnit/>
    )
  }
}
