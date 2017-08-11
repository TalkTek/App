// @flow
'use strict'

import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Animated,
  Dimensions
} from 'react-native'
import { connect } from 'react-redux'

const {
  width: screenWidth,
  height: screenHeight,
} = Dimensions.get('window')

@connect(state => ({
  isAudioPopOutBarActive: state.audio.isAudioPopOutBarActive,
}))
export default class PopOutBar extends Component {

  state = {
    popoutAudioBarHeight: new Animated.Value(screenHeight)
  }

  componentWillReceiveProps (nextProps) {
    if(nextProps.isAudioPopOutBarActive) {
      this.toggleAudioBarUp()
    }
  }

  toggleAudioBarUp = () => {
    const {
      popoutAudioBarHeight,
    } = this.state

    Animated.spring(
      popoutAudioBarHeight,
      {
        toValue: screenHeight - 97
      }
    ).start()
  }

  render () {
    return (
      <Animated.View
        style={[styles.container, {
          top: this.state.popoutAudioBarHeight
        }]}
      >
        <Text>Hello world</Text>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 48,
    width: screenWidth,
    top: 100,
    backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
  }
})
