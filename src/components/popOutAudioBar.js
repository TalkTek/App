// @flow
'use strict'

import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  StatusBar
} from 'react-native'

export default class PopOutAudioBar extends Component {
  render () {
    const { children } = this.props
    return (

      <View style={{borderWidth: 2,
      borderColor: 'red',
        flex: 1
      }}>
        <StatusBar
          barStyle="light-content"
        />

        {children}
      </View>
    )
  }
}
