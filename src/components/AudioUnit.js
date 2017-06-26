// @flow
'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-native-slider'
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  Animated
} from 'react-native'
import { Player } from 'react-native-audio-toolkit'

let buttons = {
  'play': require('../assets/img/audioElement/play.png'),
  'stop': require('../assets/img/audioElement/pause.png'),
  'backward': require('../assets/img/audioElement/backward.png'),
  'backward15': require('../assets/img/audioElement/backward15.png'),
  'forward': require('../assets/img/audioElement/forward.png'),
  'forward15': require('../assets/img/audioElement/forward15.png'),
}

export default class AudioUnit extends Component {

  state = {
    textHeight: null,
    audioElementHeight: null,
    animationHeight: new Animated.Value(),
    active: false
  }

  setTextHeight = (event) => {
    this.state.animationHeight.setValue(event.nativeEvent.layout.height)
    this.setState({
      textHeight: event.nativeEvent.layout.height
    })
  }

  setAudioElementHeight = (event) => {
    this.setState({
      audioElementHeight: event.nativeEvent.layout.height
    })
  }

  toggle = () => {
    const { active, audioElementHeight, textHeight, animationHeight } = this.state
    let initHeight = active ? audioElementHeight + textHeight :  textHeight
    let finalHeight = active ? textHeight : audioElementHeight + textHeight

    this.setState({
      active: !active
    })

    animationHeight.setValue(initHeight)
    Animated.spring(
      animationHeight,
      {
        toValue: finalHeight
      }
    ).start()
  }

  render () {
    return (
      <Animated.View
        style={[styles.container, {height: this.state.animationHeight }]}
      >
        <View onLayout={this.setTextHeight}>
          <TouchableHighlight
            onPress={this.toggle}
            underlayColor='#fff'
          >
            <Text>Press Me</Text>
          </TouchableHighlight>
        </View>
        <View onLayout={this.setAudioElementHeight}>
          <Text>HEY I'm here</Text>
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // height: 122,
    borderWidth: 1,
    borderColor: '#000033',
    overflow: 'hidden'
  }
})

AudioUnit.propTypes = {
  title: PropTypes.string,
  audioLength: PropTypes.number,
  audioUrl: PropTypes.string
}
