// @flow
'use strict'

import React, { Component } from 'react'
import {
  Image,
} from 'react-native'
import { Container, View } from 'native-base'
import { FIREBASE_CONFIG } from '../lib/config'
import firebase from 'firebase'
import { NavigationActions } from 'react-navigation'

firebase.initializeApp(FIREBASE_CONFIG)

export default class Main extends Component {
  static navigationOptions = {
    header: null,
  }

  componentWillMount () {
    const { dispatch } = this.props.navigation
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
          dispatch(
            NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({routeName: 'TalkList'})
            ]
          }))
      } else {
          dispatch(
            NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({routeName: 'Login'})
            ]
          }))
      }
    })
  }

  render() {
    return null
  }
}

const styles = {
  container: {
    backgroundColor: 'white',
  },
  bg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}