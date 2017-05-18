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
  Animated,
} from 'react-native'
import Slider from 'react-native-slider'
import {
  Player,
  MediaStates,
} from 'react-native-audio-toolkit'

const { width } = Dimensions.get('window')
let margin = Number((width*0.04).toFixed())

const audioUrl = 'https://firebasestorage.googleapis.com/v0/b/talktek-4edac.appspot.com/o/music.mp3?alt=media&token=04465df0-ef82-4a43-ae72-e297a3974e44'

let icons = {
  'play': require('../../assets/img/play@2x.png'),
  'stop': require('../../assets/img/pause@2x.png')
}

export default class GuideList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: 0,
      playing: false, // audio playing or not for Icon
      active: false, // accordion
      animationHeight: new Animated.Value(),
      duration: 0,
      sliderThumbStatus: true , // true mean disable
    }
  }

  componentWillMount() {
    this.player = null
    this._createPlayer()
  }
  
  _createPlayer() {
    if(this.player) {
      this.player.destroy()
    }

    this.player = new Player(audioUrl)
      .prepare((err) => {
        if(err) {
          console.log("error at _createPlayer()")
          console.log('err is', err);
        }
      })
  }

  _onPress() {
    if(this.state.playing) {
      this.setState({
        playing: false,
      })
      this.player.pause()
    } else {
      this.player.play(() => {
        this.setState({
          duration: this.player.duration,
          playing: true,
          sliderThumbStatus: false,
        })
      })
    }
  }

  _setMaxHeight(event) {
    this.setState({
      maxHeight: event.nativeEvent.layout.height,
    })
  }

  _setMinHeight(event) {
    this.state.animationHeight.setValue(event.nativeEvent.layout.height)
    this.setState({
      minHeight: event.nativeEvent.layout.height,
    })
  }

  _toggleAudioView() {
    const { active, minHeight, maxHeight } = this.state
    let initHeight = active? minHeight + maxHeight : minHeight,
      finalHeight = active? minHeight : maxHeight + minHeight


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

  _seek(value) {
    if(this.state.playing) {
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

  render() {
    let icon
    if(this.state.playing) {
      icon  = icons['stop']
        if (this.state.duration) {
          setTimeout(() => {
            if(this.state.progress<=101) {
            this.setState({
              progress: this.state.progress + 1
            })} else {
              this.player.stop()
              this.setState({
                playing: false,
                progress: 0,
              })
            }
          }, this.state.duration / 97)
        }
    } else {
      icon = icons['play']
    }

    console.log('progress', this.state.progress);

    return (
      <View style={styles.container}>
        <Text style={styles.caption}>講單</Text>
        <View style={styles.hr}></View>
        <View style={styles.unit}>
          <Animated.View
            style={[styles.animationView, {height: this.state.animationHeight}]}
          >
            <View onLayout={this._setMinHeight.bind(this)}>
              <TouchableHighlight
                onPress={this._toggleAudioView.bind(this)}
                underlayColor="#fff"
              >
                <View style={styles.subTitle}>
                  <View style={styles.subTitleLeftContainer}>
                    <Text style={styles.title}>1. 你是『 抓人鬼 』還是『 躲藏者 』？</Text>
                  </View>
                  <View style={styles.subTitleRightContainer}>
                    <Text style={styles.timeText}>02:30</Text>
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
                thumbStyle={this.state.sliderThumbStatus? styles.trackThumbDisable : styles.trackThumb}
                minimumTrackTintColor='rgb(31, 191, 179)'
                thumbTouchSize={{width:20,height:20}}
                disabled={this.state.sliderThumbStatus}
              />
              <TouchableHighlight onPress={this._onPress.bind(this)}
                                  underlayColor="#fff"
                                  style={styles.pp}
              >
                <Image
                  source={icon}
                  style={styles.ppImage}
                />
              </TouchableHighlight>
            </View>
          </Animated.View>
        </View>
        <View style={styles.hr}></View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: 300,
    paddingLeft: margin,
    paddingRight: margin,
  },
  caption: {
    fontSize: 15,
    marginTop: 16,
    marginBottom: 15,
    marginLeft: 9,
    color: 'rgb(33, 33, 33)'
  },
  unit: {
    marginBottom: 12,
    padding: 0,
  },
  animationView: {
    overflow: 'hidden',
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 9,
    color: 'rgb(33, 33 ,33)',
    height: 18,
  },
  subTitle: {
    flexDirection: 'row',
  },
  subTitleLeftContainer: {
    flex: 8,
    flexDirection: 'row',
    justifyContent:'flex-start'
  },
  subTitleRightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent:'flex-end',
  },
  timeText: {
    fontSize: 12,
    height: 17,
    fontWeight: '600',
    color: 'rgb(31, 191, 179)',
  },
  track: {
    height: 2,
    borderRadius: 2,
    backgroundColor: 'rgb(238, 238, 238)',
    marginLeft: margin*0.35,
    marginRight: margin*0.35,
  },
  trackThumbDisable: {
    top: 22,
    width: 20,
    height: 20,
    borderRadius: 30 / 2,
    backgroundColor: 'white',
    borderColor: 'rgb(238, 238, 238)',
    borderWidth: 2,
  },
  trackThumb: {
    top: 22,
    width: 20,
    height: 20,
    borderRadius: 30 / 2,
    backgroundColor: 'white',
    borderColor: 'rgb(31, 191, 179)',
    borderWidth: 2,
  },
  pp: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ppImage: {
    height: 40,
    width: 40,
  },
  hr: {
    height: 1,
    width: width - margin*2,
    backgroundColor: 'rgb(224, 224, 224)',
    marginBottom: 12,
  },

})
