// @flow
'use strict'

import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'
import firebase from 'firebase'

export default class KnowledgeCapsule extends Component {

  componentWillMount () {
    console.log('hello worldBBBBBBBBB')
    let capsuleRef = firebase.database().ref('capsule').limitToLast(10)
    capsuleRef.once('value', (snapshot) => {
      console.log('value is', snapshot.val())
    })
      .catch(error => console.log('error is', error))
  }

  render () {
    return (
      <Text>Hello world</Text>
    )
  }
}
