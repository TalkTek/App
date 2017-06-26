// @flow
'use strict'

import React, { Component } from 'react'
import {
  Image,
} from 'react-native'
import { Container, View } from 'native-base'
import firebase from 'firebase'
import { NavigationActions } from 'react-navigation'

export default class Main extends Component {
  static navigationOptions = {
    header: null,
  }

  componentWillMount () {
    const { dispatch } = this.props.navigation
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        // setTimeout(
          dispatch(
            NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({routeName: 'TalkList'})
            ]
          }))
        // , 1500)
      } else {
        // setTimeout(
          dispatch(
            NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({routeName: 'Login'})
            ]
          }))
          // , 1500)
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