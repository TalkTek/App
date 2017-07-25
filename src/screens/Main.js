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
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import memberAction from '../reducer/member/memberAction'

firebase.initializeApp(FIREBASE_CONFIG)

@connect(state => ({

}), dispatch => ({
  member: bindActionCreators(memberAction, dispatch)
}))

export default class Main extends Component {
  static navigationOptions = {
    header: null,
  }

  async _readUserData(user) {
    let snapshot = await firebase.database().ref(`/users/${user.uid}/profile`).once('value')
    this.props.member.changeMemberState({ ...snapshot.val(), uid: user.uid })
  }

  componentDidMount () {
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
        this._readUserData(user)
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