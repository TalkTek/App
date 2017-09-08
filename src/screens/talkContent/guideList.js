// @flow
'use strict'

import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Dimensions,
  Animated
} from 'react-native'
import Slider from 'react-native-slider'
import {
  Player
} from 'react-native-audio-toolkit'

const { width } = Dimensions.get('window')
let margin = Number(( width * 0.04).toFixed())

const audioUrl1 = 'https://firebasestorage.googleapis.com/v0/b/talktek-4edac.appspot.com/o/1.a%20%E4%BB%80%E9%BA%BC%E6%98%AF%E3%80%8C%E7%9F%A5%E8%AD%98%E5%9E%8B%E7%B6%B2%E7%B4%85%E3%80%8D_.m4a?alt=media&token=999614d4-4a10-47df-85fc-d1d96df27063'
const audioUrl2 = 'https://firebasestorage.googleapis.com/v0/b/talktek-4edac.appspot.com/o/2.a%20%E5%85%88%E5%95%8F%E5%95%8F%E8%87%AA%E5%B7%B1%EF%BC%8C%E4%BD%A0%E7%9A%84%E5%B0%88%E6%A5%AD%E6%98%AF%E4%BB%80%E9%BA%BC_.m4a?alt=media&token=e49fbb08-a108-4c46-a05e-af490f3977b4'
const audioUrl3 = 'https://firebasestorage.googleapis.com/v0/b/talktek-4edac.appspot.com/o/2.b%20%E5%B0%88%E6%A5%AD%E4%B8%8D%E5%A4%A0%EF%BC%8C%E8%AE%93%E5%A4%A7%E5%AE%B6%E7%9F%A5%E9%81%93%E4%BD%A0%E5%BE%88%E5%B0%88%E6%A5%AD%E6%89%8D%E6%98%AF%E8%A6%81%E7%B7%8A%E4%BA%8B.m4a?alt=media&token=9ca88bc4-767f-48f6-a0d9-9350fcdab11a'

let icons = {
  'play': require('../../assets/img/play@2x.png'),
  'stop': require('../../assets/img/pause@2x.png')
}

export default class GuideList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      progress: 0,
      playing: false, // audio playing or not for Icon
      active: false, // accordion
      animationHeight: new Animated.Value(),
      duration: 0,
      sliderThumbStatus: true  // true mean disable

    }
  }

  componentWillMount () {
    this.player = null
    this._createPlayer()
  }

  _createPlayer () {
    if (this.player) {
      this.player.destroy()
    }


    this.player = new Player(audioUrl1)
      .prepare((err) => {
        if(err) {
          console.log('error at _createPlayer()')
          console.log('err is', err)
        }
      })
  }


  _onPress () {
    if (this.state.playing) {
      this.setState({
        playing: false
      })
      this.player.pause()
    } else {
      this.player.play(() => {
        this.setState({
          duration: this.player.duration,
          playing: true,
          sliderThumbStatus: false
        })
      })
    }
  }

  _setMaxHeight (event) {
    this.setState({
      maxHeight: event.nativeEvent.layout.height
    })
  }

  _setMinHeight (event) {
    this.state.animationHeight.setValue(event.nativeEvent.layout.height)
    this.setState({
      minHeight: event.nativeEvent.layout.height
    })
  }

  _toggleAudioView () {
    const { active, minHeight, maxHeight } = this.state
    let initHeight = active ? minHeight + maxHeight : minHeight
    let finalHeight = active ? minHeight : maxHeight + minHeight

    this.setState({
      active: !active
    })

    this.state.animationHeight.setValue(initHeight)
    Animated.spring(
      this.state.animationHeight,
      {
        toValue: finalHeight
      }
    ).start()
  }

  _seek (value) {
    if (this.state.playing) {
      if (this.state.duration) {
        let seekTime = (value / 100) * this.state.duration
        this.player.seek(seekTime, () => {
          this.setState({
            progress: value
          })
        })
      }
    }
  }

  render () {
    let icon
    if (this.state.playing) {
      icon = icons['stop']
      if (this.state.duration) {
        setTimeout(() => {
          if (this.state.progress <= 101) {
            this.setState({
              progress: this.state.progress + 1
            })
          } else {
            this.player.stop()
            this.setState({
              playing: false,
              progress: 0
            })
          }
        }, this.state.duration / 97)
      }
    } else {
      icon = icons['play']
    }
    return (
      <View style={styles.container}>
        <Text style={styles.caption}>講單</Text>
        <View style={styles.unit}>
          <View style={styles.hr} />
          <View style={styles.divideSection}>
            <View style={styles.rec} />
            <Text style={styles.divideText}>未來，屬於知識型網紅</Text>
          </View>
          <View style={styles.hr} />
          <Animated.View
            style={[styles.animationView, {height: this.state.animationHeight}]}
          >
            <View onLayout={this._setMinHeight.bind(this)}>
              <TouchableHighlight
                onPress={this._toggleAudioView.bind(this)}
                underlayColor='#fff'
              >
                <View style={styles.subTitle}>
                  <View style={styles.subTitleLeftContainer}>
                    <Text style={styles.title}>什麼是『 知識型網紅 』？</Text>
                  </View>
                  <View style={styles.subTitleRightContainer}>
                    <Text style={styles.timeText}>01:46</Text>
                  </View>
                </View>
              </TouchableHighlight>
            </View>

            <View onLayout={this._setMaxHeight.bind(this)}>
              <Slider
                value={this.state.progress}
                step={1}
                maximumValue={103}
                onSlidingComplete={(value) => this._seek.bind(this, value)()}
                trackStyle={styles.track}
                thumbStyle={this.state.sliderThumbStatus ? styles.trackThumbDisable : styles.trackThumb}
                minimumTrackTintColor='rgb(31, 191, 179)'
                thumbTouchSize={{width: 20, height: 20}}
                disabled={this.state.sliderThumbStatus}
              />
              <TouchableHighlight
                onPress={this._onPress.bind(this)}
                underlayColor='#fff'
                style={styles.pp}
              >
                <Image
                  source={icon}
                  style={styles.ppImage}
                />
              </TouchableHighlight>
            </View>
          </Animated.View>
          <View style={styles.hr} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: 430,
    paddingLeft: margin,
    paddingRight: margin
  },
  caption: {
    fontSize: 15,
    marginTop: 16,
    marginBottom: 15,
    marginLeft: 9,
    color: 'rgb(33, 33, 33)'
  },
  divideSection: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 8
  },
  rec: {
    backgroundColor: 'rgb(31, 191, 179)',
    width: 6,
    height: 17
  },
  divideText: {
    fontSize: 15,
    marginLeft: 10
  },
  unit: {
    padding: 0
  },
  animationView: {
    overflow: 'hidden',
    marginBottom: 11,
    marginTop: 11
  },
  animationView2: {
    overflow: 'hidden',
    marginBottom: 11,
    marginTop: 11
  },
  animationView3: {
    overflow: 'hidden',
    marginBottom: 11,
    marginTop: 11
  },
  animationView4: {
    overflow: 'hidden',
    marginBottom: 11,
    marginTop: 11
  },
  animationView5: {
    overflow: 'hidden',
    marginBottom: 11,
    marginTop: 11
  },
  title: {
    fontSize: 14,
    fontWeight: '900',
    marginLeft: 9,
    color: 'rgb(33, 33 ,33)',
    height: 18
  },
  subTitle: {
    flexDirection: 'row'
  },
  subTitleLeftContainer: {
    flex: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  subTitleRightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  timeText: {
    fontSize: 12,
    height: 17,
    fontWeight: '600',
    color: 'rgb(31, 191, 179)'
  },
  track: {
    height: 2,
    borderRadius: 2,
    backgroundColor: 'rgb(238, 238, 238)',
    marginLeft: margin * 0.35,
    marginRight: margin * 0.35
  },
  trackThumbDisable: {
    top: 22,
    width: 20,
    height: 20,
    borderRadius: 30 / 2,
    backgroundColor: 'white',
    borderColor: 'rgb(238, 238, 238)',
    borderWidth: 2
  },
  trackThumb: {
    top: 22,
    width: 20,
    height: 20,
    borderRadius: 30 / 2,
    backgroundColor: 'white',
    borderColor: 'rgb(31, 191, 179)',
    borderWidth: 2
  },
  pp: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  ppImage: {
    height: 40,
    width: 40
  },
  hr: {
    height: 1,
    width: width - margin * 2,
    backgroundColor: 'rgb(224, 224, 224)'
  }
})
