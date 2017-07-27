// @flow
'use strict'

import React, { Component } from 'react'
import { Container, View } from 'native-base'
import  CONFIG  from '../lib/config'
import firebase from 'firebase'
import { NavigationActions } from 'react-navigation'

firebase.initializeApp(CONFIG.FIREBASE.PRODUCTION)

export default class Main extends Component {
  static navigationOptions = {
    header: null,
  }

  componentDidMount () {
    const { dispatch } = this.props.navigation
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
          dispatch(
            NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({routeName: 'KnowledgeCapsuleScreen'})
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