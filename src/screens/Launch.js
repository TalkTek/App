// @flow
'use strict'

import React, { Component } from 'react'
import CONFIG from '../lib/config'
import firebase from 'firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import memberAction from '../reducer/member/memberAction'
import {
  Actions
} from 'react-native-router-flux'

if ( __DEV__ ) {
  firebase.initializeApp(CONFIG.FIREBASE.DEV)
} else {
  firebase.initializeApp(CONFIG.FIREBASE.PRODUCTION)
}

@connect( undefined, dispatch => ({
  actions: bindActionCreators(memberAction, dispatch)
}))

export default class Main extends Component {
  componentDidMount () {
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        const { actions } = this.props
        actions.getMemberInfo({
          uid: user.uid
        })
        Actions.tab()
      } else {
        Actions.login()
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