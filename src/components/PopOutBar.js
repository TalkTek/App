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
  Image,
  ActivityIndicator
} from 'react-native'
import { Button } from 'native-base'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { bindActionCreators } from 'redux'
import audioAction from '../reducer/audio/audioAction'
import Modal from 'react-native-modalbox'
import PlayAudioScreen from '../screens/playAudio'


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
  currentTimeFormatted: state.audio.playingAudioDynamicInfo.currentTime.formatted,
  currentTimeSec: state.audio.playingAudioDynamicInfo.currentTime.sec,
  isPlaying: state.audio.isPlaying,
  audioName: state.audio.playingAudioStaticInfo.audioName
}), (dispatch) => {
  return {
    actions: bindActionCreators({ ...audioAction }, dispatch)
  }
})
export default class PopOutBar extends Component {

  state = {
    popoutAudioBarHeight: new Animated.Value(screenHeight),
    isModalOpen: false,
  }

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
      actions.play()
    } else {
      actions.pause()
    }
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  openModal = () => {
    Actions.playAudioScreen()
  }

  render () {
    const {
      currentTimeFormatted,
      currentTimeSec,
      isPlaying,
      audioName,
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
            {
              currentTimeSec === -0.001 || currentTimeSec === ''
                ?
                <View style={styles.popBarLoading}>
                  <ActivityIndicator
                    animating
                    color="black"
                    size="small"
                  />
                </View>
                :
                <Image
                  source={isPlaying ? buttons.pause : buttons.playingOnAudioBar}
                  style={styles.playPauseButton}
                />
            }
          </TouchableHighlight>
          <View style={styles.popoutAudioBarDes}>
            <Text style={styles.popoutAudioBarText}>
              {audioName}
            </Text>
            <Text style={styles.popoutAudioBarNumber}>
              {currentTimeSec === -0.001 || currentTimeSec === ''
                ? '00:00'
                : currentTimeFormatted}
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
  },
  popBarLoading: {
    width: 32,
    height: 32,
    marginLeft: 16,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
