// @flow
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
    actions: bindActionCreators(audioActions, dispatch),
    ga: bindActionCreators(analyticAction, dispatch)
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

  createPlayer = (url) => {
    if (playerGlobal) {
      playerGlobal.destroy()
      this.props.actions.changePlayingState('notPlaying')
      // let listening_time_end = Date.now()
      // let totalsec = parseInt(this.props.audioLength.sec)
      // console.log(totalsec)
      // console.log((listening_time_end - this.timer) / 1000 / totalsec + '%')
    }
    playerGlobal = new Player(url)
      .prepare(error => {
        if (error) {
          console.log('error at createPlayer, error is => ', error);
        } else {
          //playerGlobal.play()
          this.playOrPause()
          this.timer = Date.now()
          this.props.ga.gaSetEvent({
            category: 'capsule',
            action: 'play audio',
            value: {
              label: this.props.audioName,
              value: 1
            }
          })
        }
      })
  }

  _updateCapsuleInfo = (capsuleId, parentKey) => {
    this.props.actions.cpAudioInfoGet(
      {
        parentKey,
        capsuleId,
        memberUid: this.props.memberUid
      }
    )
  }

  forward = async () => {
    let next
    const { capsules, playingAudioPos, actions } = this.props
    let pos = capsules[playingAudioPos.i].audios.length

    if (this.interval) {
      clearInterval(this.interval)
    }

    // find the next position where we choice in screen
    if (playingAudioPos.j + 1 < pos) {
      next = capsules[playingAudioPos.i].audios[playingAudioPos.j + 1]
      await this.toggleButtonColor(playingAudioPos.i, playingAudioPos.j + 1)
      await actions.settingPlayingAudioInfo(
        next.name,
        next.length,
        {
          sec: null,
          formatted: ''
        },
        next.url,
        {
          i: playingAudioPos.i,
          j: playingAudioPos.j + 1
        },
        'forwardFunction: notChange',
        next.id,
        next.parentKey,
        next.likeCounter
      )
    } else {
      if (playingAudioPos.i === capsules.length - 1) {
        // if audio reach end of audio's list, then recycle it
        next = capsules[0].audios[0]
        await this.toggleButtonColor(0, 0)
        await actions.settingPlayingAudioInfo(
          next.name,
          next.length,
          {
            sec: null,
            formatted: ''
          },
          next.url,
          {
            i: 0,
            j: 0,

          },
          'forwardFunction: changeToBegin',
          next.id,
          next.parentKey,
          next.likeCounter
        )
      } else {
        next = capsules[playingAudioPos.i + 1].audios[0]
        actions.settingPlayingAudioInfo(next.name, next.length, next.url)
        await this.toggleButtonColor(playingAudioPos.i + 1, 0)
        await actions.settingPlayingAudioInfo(
          next.name,
          next.length,
          {
            sec: null,
            formatted: ''
          },
          next.url,
          {
            i: playingAudioPos.i + 1,
            j: 0,

          },
          'forwardFunction: changeToNext',
          next.id,
          next.parentKey,
          next.likeCounter
        )
      }
    }
    this._updateCapsuleInfo(next.id, next.parentKey)
    await this.createPlayer(next.url)
    await this.playOrPause()
  }

  backward = async () => {
    let next
    const { capsules, playingAudioPos, actions } = this.props

    if (this.interval) {
      clearInterval(this.interval)
    }

    if (playingAudioPos.j - 1 >= 0) {
      next = capsules[playingAudioPos.i].audios[playingAudioPos.j - 1]
      await this.toggleButtonColor(playingAudioPos.i, playingAudioPos.j - 1)
      await actions.settingPlayingAudioInfo(
        next.name,
        next.length,
        {
          sec: null,
          formatted: ''
        },
        next.url,
        {
          i: playingAudioPos.i,
          j: playingAudioPos.j - 1,

        },
        'BackwardFunction: Not change',
        next.id,
        next.parentKey,
        next.likeCounter
      )
    } else {
      if (playingAudioPos.i === 0) {
        // if audio reach Top of audio's list, then recycle it
        next = capsules[0].audios[0]
        await this.toggleButtonColor(0, 0)
        await actions.settingPlayingAudioInfo(
          next.name,
          next.length,
          {
            sec: null,
            formatted: ''
          },
          next.url,
          {
            i: 0,
            j: 0,

          },
          'BackwardFunction: forward to Begin',
          next.id,
          next.parentKey,
          next.likeCounter
        )
      } else {
        let maxLength = capsules[playingAudioPos.i - 1].audios.length - 1
        next = capsules[playingAudioPos.i - 1].audios[maxLength]
        await this.toggleButtonColor(playingAudioPos.i - 1, maxLength)
        await actions.settingPlayingAudioInfo(
          next.name,
          next.length,
          {
            sec: null,
            formatted: ''
          },
          next.url,
          {
            i: playingAudioPos.i - 1,
            j: maxLength,

          },
          'BackwardFunction: forward',
          next.id,
          next.parentKey,
          next.likeCounter
        )
      }
    }
    this._updateCapsuleInfo(next.id, next.parentKey)
    await this.createPlayer(next.url)
    await this.playOrPause()
  }

  forward15s = () => {
    let forwardTime = this.props.currentTimeSec + 15
    this.seek(
      forwardTime > Number(this.props.audioLength.sec) ?
        Number(this.props.audioLength.sec) :
        forwardTime
    )
  }

  backward15s = () => {
    let backwardTime = this.props.currentTimeSec - 15
    this.seek(
      backwardTime < 0 ?
        0 :
        backwardTime
    )
  }

  playOrPause = () => {
    const { playState, actions } = this.props
    if (playState === 'notPlaying' && playerGlobal) {
      actions.changePlayingState('playing')
      // react-native-audio-toolkit bug
      // only get current time after calling pause

      playerGlobal.play(() => {
        this.audioPlayingTimerStart()
      })

    } else if (!playerGlobal) {
      console.log('player is not found', );
    } else {
      actions.changePlayingState('notPlaying')
      playerGlobal.pause(() => {
        clearInterval(this.interval)
      })
    }
  }

  audioPlayingTimerStart = () => {
    const {
      actions,
      audioName,
      audioLength,
      audioUrl,
      playingAudioPos,
      currentTimeSec,
      playState
    } = this.props

    let currentTimeformatted
    let currentTimeSecNow

    // it's the react-native-audio-toolkit bugs
    // if we seek somewhere we want to listen
    // the currentTime of player's property will lose time
    // so we need to supple it
    let outdatedValue = currentTimeSec * 1000
    let nowValue

    if (playerGlobal) {
      this.interval = setInterval(() => {
        if (playState === 'playing') {
          if (playerGlobal.currentTime && (playerGlobal.currentTime > 0)) {
            console.log('currentTime from audioPlayingTimer', playerGlobal.currentTime)
            console.log('nowValue from audioPlayingTimer', nowValue)
            console.log('outDataValue from audioPlayingTimer', outdatedValue)

            nowValue = playerGlobal.currentTime

            // if seek, we supple some time
            if (nowValue < outdatedValue) {
              nowValue = outdatedValue + 350
            }

            let min = Math.floor(nowValue / 60000)
            let sec = Math.floor(nowValue / 1000) - min * 60

            if (sec < 10) { sec = "0" + sec }
            if (min < 10) { min = "0" + min }

            currentTimeformatted = min + ":" + sec
            currentTimeSecNow = Math.floor(nowValue / 1000)

            actions.settingPlayingAudioInfo(
              audioName,
              audioLength,
              {
                sec: currentTimeSecNow,
                formatted: currentTimeformatted
              },
              audioUrl,
              playingAudioPos,
              'audioPlayingTimerStart: running'
            )

            outdatedValue = nowValue
          } else {
            // when the audio end
            clearInterval(this.interval)
            let listening_time_end = Date.now()
            let totalsec = parseInt(this.props.audioLength.sec)
            console.log(totalsec)
            let ratio = parseInt((listening_time_end - this.timer) / 1000) / totalsec
            console.log(ratio)
            if (ratio > 0.7) {
              this.props.ga.gaSetEvent({
                category: 'capsule',
                action: 'audio complete',
                value: {
                  label: this.props.audioName,
                  value: 1
                }
              })
            }

            currentTimeformatted = "00:00"

            actions.settingPlayingAudioInfo(
              audioName,
              audioLength,
              {
                sec: 0,
                formatted: currentTimeformatted
              },
              audioUrl,
              playingAudioPos,
              'audioPlayingTimerStart: stoping'
            )
            actions.changePlayingState('notPlaying')

            this.forward()
          }
        }
      }, 500)
    } else {
      console.log("player is null, so no audio current time")
    }
  }

  seek = (value) => {
    const {
      actions,
      audioLength,
      audioName,
      audioUrl,
      playingAudioPos
    } = this.props
    if (playerGlobal) {
      if (playerGlobal.duration) {


        console.log('valueSeek from seek', value)

        let percent = Number((value / audioLength.sec).toFixed(2))

        console.log('audioLength.sec from seek', audioLength.sec)
        console.log('percent from seek', percent)

        let position = percent * playerGlobal.duration
        playerGlobal.seek(position, async () => {

          clearInterval(this.interval)

          let sec = Math.floor(value % 60)
          let min = Math.floor(value / 60)

          if (sec < 10) { sec = "0" + sec }
          if (min < 10) { min = "0" + min }

          let formatted = min + ':' + sec

          await actions.settingPlayingAudioInfo(
            audioName,
            audioLength,
            {
              sec: value,
              formatted,
            },
            audioUrl,
            playingAudioPos,
            'seekFunction'
          )
          await this.audioPlayingTimerStart()
        })
      }
    }
  }

  toggleButtonColor = (i, j) => {
    const { capsules, playingAudioPos } = this.props
    if (playingAudioPos.i !== '' && playingAudioPos.j !== '') {
      capsules[playingAudioPos.i].audios[playingAudioPos.j].active = false
    }
    capsules[i].audios[j].active = true
  }

  _onPress = async (audio, i, j) => {
    const { actions } = this.props

    if (this.interval) {
      clearInterval(this.interval)
    }

    // need to place before the action of settingPlayingAudioInfo
    await this.toggleButtonColor(i, j)

    // initialize playing audio
    await actions.settingPlayingAudioInfo(
      audio.name,
      audio.length,
      {
        sec: null,
        formatted: '00:00'
      },
      audio.url,
      {
        i, j
      },
      'onPressAudio',
      audio.id,
      audio.parentKey,
      audio.likeCounter
    )

    await this.createPlayer(audio.url)
    await this._updateCapsuleInfo(audio.id, audio.parentKey)
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
            playOrPause={this.playOrPause}
            forward={this.forward}
            forward15s={this.forward15s}
            backward={this.backward}
            backward15s={this.backward15s}
            seek={this.seek}
            toggleModal={this.toggleModal}
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
