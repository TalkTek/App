// @flow
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import memberAction from '../reducer/member/memberAction'
import {auth} from '../lib/firebase'
import {
  Actions
} from 'react-native-router-flux'

@connect( undefined, dispatch => ({
  actions: bindActionCreators(memberAction, dispatch)
}))

export default class Main extends Component {
  componentDidMount () {
    auth.onAuthStateChanged( user => {
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