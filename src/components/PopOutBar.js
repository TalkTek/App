// @flow
'use strict'

import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableHighlight,
  Image
} from 'react-native'
import { Button } from 'native-base'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { bindActionCreators } from 'redux'
import audioAction from '../reducer/audio/audioAction'

const {
  width: screenWidth,
  height: screenHeight,
} = Dimensions.get('window')

let buttons = {
  'playingOnAudioBar': require('../assets/img/audioElement/play.png'),
  'pause': require('../assets/img/audioElement/pause.png'),
  'expand': require('../assets/img/knowledgeCapsule/expend.png')
}

@connect(state => ({
  isAudioPopOutBarActive: state.audio.isAudioPopOutBarActive,
  currentTimeFormatted: state.audio.playingAudioInfo.currentTime.formatted,
  isPlaying: state.audio.isPlaying,
  audioName: state.audio.playingAudioInfo.name
}), (dispatch) => {
  return {
    actions: bindActionCreators({ ...audioAction }, dispatch)
  }
})
export default class PopOutBar extends Component {

  state = {
    popoutAudioBarHeight: new Animated.Value(screenHeight)
  }

  timer = setInterval(() => {
    if (this.props.isPlaying) {
      this.props.actions.audioUpdateCurrentTime()
    }
  }, 400)

  componentWillReceiveProps (nextProps) {
    if(nextProps.isAudioPopOutBarActive) {
      this.toggleAudioBarUp()
    } else {
      this.toggleAudioBarDown()
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

  toggleAudioBarDown = () => {
    const {
      popoutAudioBarHeight,
    } = this.state

    Animated.spring(
      popoutAudioBarHeight,
      {
        toValue: screenHeight
      }
    ).start()
  }

  playOrPause = () => {
    const {isPlaying, actions} = this.props
    if (!isPlaying) {
      actions.audioPlay()
    } else {
      actions.audioPause()
    }
  }

  openModal = () => {
    Actions.player()
    this.props.actions.toggleAudioPopoutBar()
  }

  render () {
    const {
      currentTimeFormatted,
      isPlaying,
      audioName,
      isAudioPopOutBarActive,
    } = this.props
    
    return (
      <Animated.View
        style={[styles.container, {
          top: this.state.popoutAudioBarHeight
        }]}
      >
        <TouchableHighlight
          transparent
          onPress={this.playOrPause}
          underlayColor="#fff"
        >
          <Image
            source={isPlaying ? buttons.pause : buttons.playingOnAudioBar}
            style={styles.playPauseButton}
          />
        </TouchableHighlight>
        <View style={styles.popoutAudioBarDes}>
          <Text style={styles.popoutAudioBarText}>
            {audioName}
          </Text>
          <Text style={styles.popoutAudioBarNumber}>
            {currentTimeFormatted ? currentTimeFormatted : '00:00'}
          </Text>
        </View>
        <Button
          transparent
          onPress={this.openModal}
        >
          <Image
            source={buttons.expand}
            style={styles.open}
          />
        </Button>
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
    backgroundColor: 'rgb(245, 245, 245)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  playPauseButton: {
    width: 32,
    height: 32,
    marginLeft: 16,
    marginRight: 12
  },
  open: {
    width: 20,
    height: 20
  },
  popoutAudioBarDes: {
    width: screenWidth * 0.68
  },
  popoutAudioBarText: {
    fontWeight: '900',
    fontSize: 13,
    color: 'rgb(33, 33, 33)'
  },
  popoutAudioBarNumber: {
    fontSize: 10,
    color: 'rgb(33, 33, 33)'
  }
})
