// @flow
'use strict'

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import audioActions from '../../reducer/audio/audioAction'
import analyticActions from '../../reducer/analytic/analyticAction'
import capsuleAction from '../../reducer/capsule/capsuleAction'
import downloadActions from '../../reducer/download/downloadAction'
import { connect } from 'react-redux'
import {
  TouchableHighlight,
  Animated,
  Dimensions,
  ActivityIndicator,
  Platform,
  NetInfo
} from 'react-native'
import {
  Container,
  Content,
  View,
  Text,
  Left,
  Right,
  Button,
  List,
  ListItem,
  Footer
} from 'native-base'
import firebase from 'firebase'
import styles from './styles'
import {
  MessageBarAlert,
  MessageBarManager
} from 'react-native-message-bar'
import {
  Actions
} from 'react-native-router-flux'
import Icon from '../../components/img/icon/SmallIcon'
import Banner from '../../components/img/banner/fullWidthBanner'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
console.log('screenHeight', screenHeight);
console.log('screenWidth', screenWidth);

let buttons = {
  'playingOnAudioBar': require('../../assets/img/audioElement/play.png'),
  'playing': require('../../assets/img/audioElement/playing2.png'),
  'pause': require('../../assets/img/audioElement/pause.png'),
  'expand': require('../../assets/img/knowledgeCapsule/expend.png'),
  'playable': require('../../assets/img/audioElement/playing1.png')
}

@connect(state => ({
  isPlaying: state.audio.isPlaying,
  capsules: state.audio.capsules,
  isCpAudioLoaded: state.audio.isCpAudioLoaded,
  lastKey: state.capsule.lastKey,
  memberUid: state.member.uid,
}), dispatch => ({
  actions: bindActionCreators({...audioActions, ...analyticActions, ...capsuleAction, ...downloadActions}, dispatch),
}))

export default class KnowledgeCapsule extends Component {

  state = {
    audioBarActive: false,
    offsetY: 0,
    fabActive: '',
    fabScale: new Animated.Value(0)
  }

  loadCount = 2

  touchY = -1

  resolveData(lastKey) {
    const { actions } = this.props
    actions.loadCpAudio({
      lastKey,
      limitToLast: this.loadCount
    })
  }

  componentDidMount () {
    const { actions, lastKey } = this.props
    this.resolveData(lastKey)
    actions.gaSetScreen('KnowledgeCapsule')
  }

  onScroll = (event) => {
    const {
      actions
    } = this.props
    if (this.touchY === -1) {
      this.touchY = event.nativeEvent.pageY
    } else {
      const diff = event.nativeEvent.pageY - this.state.offsetY
      if(diff > 10) {
        actions.showAudioPopoutBar()
      } else if(diff < -10) {
        actions.hideAudioPopoutBar()
      }
      this.setState({
        offsetY: event.nativeEvent.pageY
      })
    }
  }

  onPress = (parentKey, childKey) => {
    const { actions } = this.props
    actions.onPress(parentKey, childKey, 'remote')
  }

  onScrollEndReached = () => {
    const { lastKey } = this.props

    if (lastKey === null) {
      return
    } else {
      this.resolveData(lastKey)
    }
  }

  render() {
    let CapUnit = null
    const {
      capsules,
      isCpAudioLoaded,
    } = this.props
    if(capsules) {
      let counter = 0
      let index

      CapUnit = Object.keys(capsules).map((parentKey, i) => {
        return (
          <View key={i} style={styles.capContainer}>
            <View style={styles.capTitle}>
              <Text style={styles.capTitleText}>
                {capsules[parentKey].title}
              </Text>
            </View>
              {
                Object.keys(capsules[parentKey].audios).map((childKey, j) => {
                  let audio = capsules[parentKey].audios[childKey]
                  return (
                    <View style={styles.capUnit} key={j}>
                      <TouchableHighlight
                        style={styles.capPlayPauseButton}
                        onPress={this.onPress.bind(this, parentKey, childKey)}
                        underlayColor="#fff"
                      >
                        <View style={styles.capAudio}>
                          <Icon
                            source={audio.active ? buttons.playing : buttons.playable}
                            marginRight={12}
                          />
                          <View>
                            <Text style={audio.active ? styles.capAudioTextPlaying : styles.capAudioTextNotPlaying}>
                              {audio.audioName}
                            </Text>
                            <Text style={styles.audioLengthText}>
                              {audio.downloaded ? `${audio.length.formatted} 已下載` : audio.length.formatted }
                            </Text>
                            {/* <Text style={styles.audioLengthText}>
                              {audio.length ? audio.length.formatted : ''}
                            </Text> */}
                          </View>
                        </View>
                      </TouchableHighlight>
                      <TouchableHighlight
                    underlayColor="#fff"
                    onPress={() => {
                      this.setState({ fabActive: audio.id, fabScale: new Animated.Value(0) },
                        () =>
                          Animated.spring(
                            this.state.fabScale,
                            {
                              toValue: 1,
                              speed: 5,
                              bounciness: 12
                            }
                          ).start()
                      )
                    }}>
                    <View>
                      {
                        audio.id &&
                        this.state.fabActive === audio.id &&
                        <Animated.View style={{ transform: [{ scale: this.state.fabScale }], opacity: 0.9, position: 'absolute', left: -70, width: 70, height: 28, backgroundColor: 'white', borderRadius: 20, shadowColor: 'rgba(0,0,0,0.2)', shadowOffset: { width: 0, height: 1 }, shadowRadius: 5, shadowOpacity: 10 }}>
                          <TouchableHighlight
                            onPress={() => {
                              console.log(audio.audioName + ' download')
                              this.props.actions.downloadCpAudio({...audio, parentKey: parentKey, title: capsules[parentKey].title})
                              }}
                          >
                            <Text style={{textAlign: 'center', textAlignVertical: 'center', lineHeight: 28}}>{'下載'}</Text>
                          </TouchableHighlight>
                        </Animated.View>
                      }
                      <Icon
                        source={buttons.playing}
                        style={styles.capPlayPauseButtonImage}
                      />
                    </View>
                  </TouchableHighlight>
                    </View>
                  )
                })
              }
          </View>
        )
      })
    }
    return (
      <Container style={styles.container}
        onMoveShouldSetResponder={this.props.isPlaying? this.onScroll: null}
        onStartShouldSetResponder={() => this.setState({fabActive: ''})}
      >
        <View>
          <Banner
            source={require('../../assets/img/knowledgeCapsule/banner.png')}
          />
        </View>
        <Content
          onMomentumScrollEnd={this.onScrollEndReached}
        >
          {
            isCpAudioLoaded
              ? CapUnit
              :
              <View style={styles.loading}>
                <ActivityIndicator
                  animating
                  color="black"
                  size="large"
                />
              </View>
          }
        </Content>
      </Container>
    )
  }
}


