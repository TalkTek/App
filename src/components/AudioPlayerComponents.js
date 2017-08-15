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
import { Actions } from 'react-native-router-flux'

const {
  width: screenWidth,
  height: screenHeight,
} = Dimensions.get('window')

let buttons = {
  'playingOnAudioBar': require('../assets/img/audioElement/play.png'),
  'pause': require('../assets/img/audioElement/pause.png'),
  'expand': require('../assets/img/knowledgeCapsule/expend.png')
}

@connect(state => {
  const {
    member,
    audio,
    audio: { playingAudioInfo }
  } = state
  return {
    memberUid: member.uid,
    capsules: state.audio.capsules,
    isPlaying: state.audio.isPlaying,
    audioName: playingAudioInfo.name,
    currentTimeFormatted: playingAudioInfo.currentTime.formatted,
    currentTimeSec: playingAudioInfo.currentTime.sec
  }
}, dispatch => {
  return {
    actions: bindActionCreators({...audioActions, ...analyticAction}, dispatch),
  }
})
export default class AudioComponents extends Component {

  interval = null

  // timer = setInterval(() => {
  //   if (this.props.isPlaying) {
  //     this.props.actions.audioUpdateCurrentTime()
  //   }
  // }, 450)

  state = {
    popoutAudioBarHeight: new Animated.Value(screenHeight - 100),
    popoutAudioBarOpacity: new Animated.Value(0),
    offsetY: 0,
    isModalOpen: false,
  }

  componentDidMount() {
    this.toggleAudioBarUp()
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

    this.setState({
      isModalOpen: true
    })
  }

  toggleAudioBarDown = () => {
    const {
      popoutAudioBarHeight,
      popoutAudioBarOpacity
    } = this.state

    this.setState({
      isModalOpen: false
    })
    
    Actions.pop()
    // Animated.parallel([
    //   Animated.timing(popoutAudioBarOpacity, {
    //     toValue: 0,
    //     duration: 100
    //   }),
    //   Animated.spring(popoutAudioBarHeight, {
    //     toValue: screenHeight - 49
    //   })
    // ]).start()
  }

  toggleModal = () => {
    if (this.state.isModalOpen) {
      this.toggleAudioBarDown()
    } else {
      this.toggleAudioBarUp()
    }
  }

  openModal = () => {
    this.setState({
      isModalOpen: true
    })
    this.refs.playAudio.open()
  }

  _onPress = async (audio: object, i: number, j: string, pos:number) => {
    const { audioLoad } = this.props.actions
    const data: {
      audio: object,
      i: number,
      j: number,
      pos: number
    } = {
      audio,
      i,
      j,
      pos
    }
    this.props.actions.cpAudioInfoGet(
      {
        parentKey: audio.parentKey,
        capsuleId: audio.id,
        memberUid: this.props.memberUid
      }
    )
    audioLoad(data)
    this.toggleAudioBarUp()
    this.toggleButtonColor(i, j)
  }

  _playOrPause = () => {
    const {isPlaying, actions} = this.props
    if (!isPlaying) {
      actions.audioPlay()
    } else {
      actions.audioPause()
    }
  }

  _forward = () => {
    const { audioToNextTrack } = this.props.actions
    audioToNextTrack()
  }

  _forward15s = () => {
    let {currentTimeSec} = this.props
    this._seek(currentTimeSec + 15)
  }

  _backward = () => {
    const { audioToPreviousTrack } = this.props.actions
    audioToPreviousTrack()
  }

  _backward15s = () => {
    let {currentTimeSec} = this.props
    this._seek(currentTimeSec - 15)
  }

  _seek = (value) => {
    this.props.actions.audioSeek(value)
    if (!this.props.isPlaying)
      setTimeout(() => this.props.actions.audioUpdateCurrentTime(), 50)
  }

  render() {
    const {
      children,
      currentTimeFormatted,
      isPlaying,
      audioName
    } = this.props

    return (
      <View style={{
        flex: 1,
      }}>
        {/* {React.cloneElement(children, {
          //_onPress: this._onPress,
          //_toggleAudioBarDown: this.toggleAudioBarDown,
          //_toggleAudioBarUp: this.toggleAudioBarUp
        })} */}
        {/* <Animated.View
          style={[styles.container, {
            top: this.state.popoutAudioBarHeight,
            opacity: this.state.popoutAudioBarOpacity,
          }]}
        >
          <TouchableHighlight
            transparent
            onPress={this._playOrPause}
            underlayColor="#fff"
          >
            <Image
              source={isPlaying? buttons.pause : buttons.playingOnAudioBar}
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
        </Animated.View> */}
        <Modal
          ref={"playAudio"}
          position={"center"}
          isOpen={this.state.isModalOpen}
          swipeToClose={false}
        >
          <PlayAudioScreen
            playOrPause={this._playOrPause}
            forward={this._forward}
            forward15s={this._forward15s}
            backward={this._backward}
            backward15s={this._backward15s}
            seek={this._seek}
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
