// @flow
'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import audioActions from '../../reducer/audio/audioAction'
import { connect } from 'react-redux'
import {
  Container,
  View,
  Text,
  Header,
  Left,
  Body,
  Right,
  Button,
  Content,
  Footer,
} from 'native-base'
import {
  TouchableHighlight,
  Image
} from 'react-native'
import styles from './styles'
import Slider from 'react-native-slider'

const mapStateToProps = (state) => {
  return {
    memberUid: state.member.uid,
    likeCounter: state.audio.playingAudioInfo.likeCounter,
    audioIsGood: state.audio.playingAudioInfo.audioIsGood,
    capsulesId: state.audio.playingAudioInfo.capsulesId,
    parentKey: state.audio.playingAudioInfo.parentKey,
    playState: state.audio.playState,
    audioName: state.audio.playingAudioInfo.name,
    audioUrl: state.audio.playingAudioInfo.url,
    audioLengthFormatted: state.audio.playingAudioInfo.length.formatted,
    audioLengthSec: Number(state.audio.playingAudioInfo.length.sec),
    currentTimeFormatted: state.audio.playingAudioInfo.currentTime.formatted,
    currentTimeSec: Number(state.audio.playingAudioInfo.currentTime.sec)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(audioActions, dispatch)
  }
}

class PlayAudio extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  }
  

  state = {
    playState: null, // need to use redux to solve it
    value: 0,
  }

  buttons = {
    close: require('../../assets/img/playAudio/close.png'),
    footer: {
       good: {
          notActive: require('../../assets/img/playAudio/good.png'),
          active: require('../../assets/img/playAudio/goodActive.png'),
          checkActive: 'audioIsGood',
          name: 'likeCounter',
          func: this._audioIsGoodToggle
        },
        timer: {
          notActive: require('../../assets/img/playAudio/timer.png'),
          name: '20:39'
        },
        addSpeed: {
          notActive: require('../../assets/img/playAudio/addSpeed.png'),
          name: '速率'
        },
        word: {
          notActive: require('../../assets/img/playAudio/word.png'),
          name: '文檔'
        },
        more: {
          notActive: require('../../assets/img/playAudio/more.png'),
          name: '更多'
        }
    },
    body: {
      backward15: {
        twoState: false,
        link: require('../../assets/img/audioElement/backward15.png'),
        func: this.props.navigation.state.params.backward15s
      },
      backward: {
        twoState: false,
        link: require('../../assets/img/audioElement/backward.png'),
        func: this.props.navigation.state.params.backward
      },
      playOrPause: {
        twoState: true,
        playLink: require('../../assets/img/playAudio/play.png'),
        pauseLink: require('../../assets/img/audioElement/pause.png'),
        func: this.props.navigation.state.params.playOrPauseFunc
      },
      forward: {
        twoState: false,
        link: require('../../assets/img/audioElement/forward.png'),
        func: this.props.navigation.state.params.forward
      },
      forward15: {
        twoState: false,
        link: require('../../assets/img/audioElement/forward15.png'),
        func: this.props.navigation.state.params.forward15s
      },
    }
  }

  _onSlidingComplete = (value) => {
    const { seek } = this.props.navigation.state.params
    seek(value)
  }

  _audioIsGoodToggle() {
    this.props
      .actions
      .cpAudioGoodChange(
        !this.props.audioIsGood,
        this.props.capsulesId,
        this.props.parentKey,
        this.props.memberUid
      )
  }

  render () {
    const {
      goBack,
    } = this.props.navigation
    const {
      playOrPauseFunc,
      seek,
    } = this.props.navigation.state.params
    const {
      playState,
      audioName,
      audioLengthFormatted,
      audioLengthSec,
      currentTimeFormatted,
    } = this.props

    const footerButtons = Object.values(this.buttons.footer).map((button, i) => {
      return (
        <TouchableHighlight
          transparent
          key={i}
          onPress={typeof button.func === 'function'? button.func.bind(this): null}
          underlayColor="#fff"
        >
          <View style={styles.footerFunUnit}>
            <Image
              source={this.props[button.checkActive]? button.active: button.notActive}
              style={styles.footerImages}
            />
            <Text
              style={styles.footerText}
            >
              {!isNaN(this.props[button.name])? this.props[button.name]: button.name}
            </Text>
          </View>
        </TouchableHighlight>
      )
    })

    const bodyButtons = Object.values(this.buttons.body).map((button, i) => (
      <TouchableHighlight
        key={i}
        onPress={() => button.func()}
        underlayColor="#fff"
      >
        <Image
          source={button.twoState
            ? (playState === 'playing'
              ? button.pauseLink : button.playLink
            )
            : button.link
          }
          style={styles.bodyImages}
        />
      </TouchableHighlight>
    ))

    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left/>
          <Body/>
          <Right>
            <Button
              transparent
              onPress={() => goBack()}
            >
              <Image
                source={this.buttons.close}
              />
            </Button>
          </Right>
        </Header>
        <Content
          directionalLockEnabled
        >
          <View>
           <Image
             style={styles.banner}
             source={require('../../assets/img/knowledgeCapsule/banner.png')}
           />
          </View>
          <View style={styles.body}>
            <View style={styles.title}>
              <Text style={styles.titleText}>
                {audioName}
              </Text>
            </View>
            <View style={styles.audioType}>
              <Text style={styles.audioTypeText}>
                #方法技能
              </Text>
            </View>
            <View style={styles.slider}>
              <View style={styles.sliderTime}>
                <Text style={styles.sliderTimeText}>{currentTimeFormatted ? currentTimeFormatted : '00:00'}</Text>
                <Text/>
                <Text style={styles.sliderTimeText}>{audioLengthFormatted}</Text>
              </View>
              <Slider
                value={this.props.currentTimeSec}
                step={1}
                maximumValue={audioLengthSec}
                onSlidingComplete={this._onSlidingComplete}
                minimumTrackTintColor='rgb(31, 191, 179)'
                thumbTouchSize={{width: 20, height: 20}}
                trackStyle={styles.track}
                thumbStyle={styles.trackThumb}
              />
            </View>
            <View style={styles.audioFunc}>
              {bodyButtons}
            </View>
          </View>
        </Content>
        <View style={styles.footer}>
          {footerButtons}
        </View>
      </Container>
    )
  }
}

PlayAudio.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayAudio)