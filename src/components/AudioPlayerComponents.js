'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  Animated,
  TouchableHighlight,
  ScrollView,
  Image,
} from 'react-native'
import Modal from 'react-native-modalbox'
import PlayAudioScreen from '../screens/playAudio'

import audioActions from '../reducer/audio/audioAction'
import analyticAction from '../reducer/analytic/analyticAction'

import { Button } from 'native-base'
import { Player } from 'react-native-audio-toolkit'

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
  memberUid: state.member.uid,
  playState: state.audio.playState,
  capsules: state.audio.capsules,
  capsuleId: state.audio.id,
  audioName: state.audio.playingAudioInfo.name,
  currentTimeFormatted: state.audio.playingAudioInfo.currentTime.formatted,
  currentTimeSec: state.audio.playingAudioInfo.currentTime.sec,
  audioLength: state.audio.playingAudioInfo.length,
  audioUrl: state.audio.playingAudioInfo.url,
  isCpAudioLoaded: state.audio.isCpAudioLoaded,
  playingAudioPos: {
    i: state.audio.playingAudioInfo.pos.i,
    j: state.audio.playingAudioInfo.pos.j
  }
}), dispatch => {
  return {
    actions: bindActionCreators({...audioActions, ...analyticAction}, dispatch),
  }
})
export default class AudioComponents extends Component {

  interval = null

  timer = null

  state = {
    popoutAudioBarHeight: new Animated.Value(screenHeight - 100),
    popoutAudioBarOpacity: new Animated.Value(0),
    offsetY: 0,
    isModalOpen: false,
  }

  toggleAudioBarUp = () => {
    const {
      popoutAudioBarHeight,
      popoutAudioBarOpacity
    } = this.state

    Animated.spring(
      popoutAudioBarHeight,
      {
        toValue: screenHeight - 97
      }
    ).start()

    Animated.spring(
      popoutAudioBarOpacity,
      {
        toValue: 100
      }
    ).start()
  }

  toggleAudioBarDown = () => {
    const {
      popoutAudioBarHeight,
      popoutAudioBarOpacity
    } = this.state

    Animated.parallel([
      Animated.timing(popoutAudioBarOpacity, {
        toValue: 0,
        duration: 100
      }),
      Animated.spring(popoutAudioBarHeight, {
        toValue: screenHeight - 49
      })
    ]).start()
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  openModal = () => {
    this.setState({
      isModalOpen: true
    })
    this.refs.playAudio.open()
  }

  _onPress = async (audio) => {
    this.toggleAudioBarUp()
  }

  render() {
    const {
      children,
      currentTimeFormatted,
      playState,
      audioName
    } = this.props

    return (
      <View style={{
        flex: 1,
      }}>
        {React.cloneElement(children, {
          _onPress: this._onPress,
          _toggleAudioBarDown: this.toggleAudioBarDown,
          _toggleAudioBarUp: this.toggleAudioBarUp
        })}
        <Animated.View
          style={[styles.container, {
            top: this.state.popoutAudioBarHeight,
            opacity: this.state.popoutAudioBarOpacity,
          }]}
        >
          <TouchableHighlight
            transparent
            onPress={this.playOrPause}
            underlayColor="#fff"
          >
            <Image
              source={playState === 'playing' ? buttons.pause : buttons.playingOnAudioBar}
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
        <Modal
          ref={"playAudio"}
          position={"center"}
          isOpen={this.state.isModalOpen}
          swipeToClose={false}
        >
          <PlayAudioScreen
            playOrPause={() => {}}
            forward={() => {}}
            forward15s={() => {}}
            backward={() => {}}
            backward15s={() => {}}
            seek={() => {}}
            toggleModal={() => this.toggleModal()}
          />
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: screenWidth,
    height: 48,
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
