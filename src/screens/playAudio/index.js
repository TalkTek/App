// @flow
'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import audioActions from '../../reducer/audio/audioAction'
import analyticAction from '../../reducer/analytic/analyticAction'
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
  Footer
} from 'native-base'
import {
  TouchableHighlight,
} from 'react-native'
import styles from './styles'
import Slider from 'react-native-slider'
import DocScreen from '../../screens/playAudio/playerDoc'
import Modal from 'react-native-modalbox'
import FunctionIcon from '../../components/img/icon/XLIcon'
import CloseIcon from '../../components/img/icon/XSmallIcon'
import Banner from '../../components/img/banner/fullWidthBanner'
import { Actions } from 'react-native-router-flux'

const mapStateToProps = (state) => {
  return {
    isPlaying: state.audio.isPlaying,
    memberUid: state.member.uid,
    likeCounter: state.audio.playingAudioStaticInfo.likeCounter,
    userFavoriteCapsules: state.member.favoriteCapsule,
    capsulesId: state.audio.playingAudioStaticInfo.id,
    parentKey: state.audio.playingAudioStaticInfo.parentKey,
    playState: state.audio.isPlaying,
    audioName: state.audio.playingAudioStaticInfo.audioName,
    audioUrl: state.audio.playingAudioStaticInfo.url,
    audioLengthFormatted: state.audio.playingAudioStaticInfo.length.formatted,
    audioLengthSec: Number(state.audio.playingAudioStaticInfo.length.sec),
    currentTimeFormatted: state.audio.playingAudioDynamicInfo.currentTime.formatted,
    currentTimeSec: Number(state.audio.playingAudioDynamicInfo.currentTime.sec)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(audioActions, dispatch),
    ga: bindActionCreators(analyticAction, dispatch)
  }
}

class PlayAudio extends Component {
  state = {
    playState: null, // need to use redux to solve it
    value: 0,
    isModalOpen: false,
    swipeToClose: true,
  }

  buttons = {
    close: require('../../assets/img/playAudio/close.png'),
    footer: {
       good: {
          notActive: require('../../assets/img/playAudio/good.png'),
          active: require('../../assets/img/playAudio/goodActive.png'),
          checkActive: this.isGood,
          name: 'likeCounter',
          func: this._audioIsGoodToggle
        },
        // timer: {
        //   notActive: require('../../assets/img/playAudio/timer.png'),
        //   name: '00:00'
        // },
        // addSpeed: {
        //   notActive: require('../../assets/img/playAudio/addSpeed.png'),
        //   name: '速率'
        // },
        word: {
          notActive: require('../../assets/img/playAudio/word.png'),
          name: '文檔',
          func: () => this.openModal()
        },
        // more: {
        //   notActive: require('../../assets/img/playAudio/more.png'),
        //   name: '更多'
        // }
    },
    body: {
      backward15: {
        twoState: false,
        link: require('../../assets/img/audioElement/backward15.png'),
        func: this.props.backward15s
      },
      backward: {
        twoState: false,
        link: require('../../assets/img/audioElement/backward.png'),
        func: this.props.backward
      },
      playOrPause: {
        twoState: true,
        playLink: require('../../assets/img/playAudio/play.png'),
        pauseLink: require('../../assets/img/audioElement/pause.png'),
        func: () => this.playOrPause()
      },
      forward: {
        twoState: false,
        link: require('../../assets/img/audioElement/forward.png'),
        func: this.props.forward
      },
      forward15: {
        twoState: false,
        link: require('../../assets/img/audioElement/forward15.png'),
        func: this.props.forward15s
      },
    }
  }

  componentDidMount() {
    const { actions } = this.props
    actions.hideAudioPopoutBar()
    this.props.ga.gaSetEvent({
      category: 'capsule',
      action: 'open player',
      value: {
        label: this.props.audioName,
        value: 1
      }
    })
  }

  playOrPause = () => {
    const {isPlaying, actions} = this.props
    if (!isPlaying) {
      actions.play()
    } else {
      actions.pause()
    }
  }

  isGood = () => {
    const { userFavoriteCapsules, capsulesId } = this.props
    return userFavoriteCapsules[capsulesId]
  }

  _onSlidingComplete = (value) => {
    this.props.seek(value)
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  openModal = () => {
    this.setState({
      isModalOpen: true,
      swipeToClose: !this.state.swipeToClose
    })
    this.refs.docScreen.open()
  }

  _audioIsGoodToggle() {
    this.props.ga.gaSetEvent({
      category: 'capsule',
      action: this.props.audioIsGood? 'unlike capsule' : 'like capsule',
      value: {
        label: this.props.audioName,
        value: 1
      }
    })
    this.props
      .actions
      .cpAudioGoodChange(
        !this.props.audioIsGood,
        this.props.capsulesId,
        this.props.parentKey,
        this.props.memberUid
      )
  }

  _buttonGaEvent(type) {
    if (type !== 'playOrPause')
    this.props.ga.gaSetEvent({
      category: 'capsule',
      action: type,
      value: {
        label: this.props.audioName,
        value: 1
      }
    })
  }

  _gaGoBack() {
    this.props.ga.gaSetEvent({
      category: 'capsule',
      action: 'close player',
      value: {
        label: this.props.audioName,
        value: 1
      }
    })
  }

  back = () => {
    const { actions } = this.props
    actions.showAudioPopoutBar()
    Actions.pop()
  }

  render () {
    const {
      toggleModal,
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
            <FunctionIcon
              source={button.checkActive? button.active: button.notActive}
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

    const bodyButtons = Object.keys(this.buttons.body).map((buttonKey, i) => {
      let button = this.buttons.body[buttonKey]
      return (
        <TouchableHighlight
          key={i}
          onPress={() => { 
            this._buttonGaEvent(buttonKey)
            button.func() 
          }}
          underlayColor="#fff"
        >
          <View>
            <FunctionIcon
              source={button.twoState
                ? (playState
                  ? button.pauseLink : button.playLink
                )
                : button.link
              }
            />
          </View>
        </TouchableHighlight>
      )
    })

    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left/>
          <Body/>
          <Right>
            <Button
              transparent
              onPress={this.back}
            >
              <CloseIcon
                source={this.buttons.close}
              />
            </Button>
          </Right>
        </Header>
        <Content
          directionalLockEnabled
        >
          <View>
           <Banner
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
        <Modal
          ref={'docScreen'}
          position={'center'}
          isOpen={this.state.isModalOpen}
          swipeToClose={this.state.swipeToClose}
          swipeArea={0}
        >
          <DocScreen
            toggleModal={this.toggleModal}
          />
        </Modal>
      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayAudio)
