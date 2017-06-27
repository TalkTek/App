// @flow
'use strict'

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import * as globalActions from '../../reducer/global/globalAction'
import { connect } from 'react-redux'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'
import firebase from 'firebase'
import AudioUnit from '../../components/AudioUnit'

const mapStateToProps = (state) => {
  return {
    playing: state.playing
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(dispatch, globalActions)
  }
}

class KnowledgeCapsule extends Component {
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
      <AudioUnit />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KnowledgeCapsule)
