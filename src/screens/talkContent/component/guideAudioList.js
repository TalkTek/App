import React, { Component } from 'react'
import {
  View,
  TouchableHighlight,
  Image,
  Animated
} from 'react-native'
import { H3, H4 } from '../../../components/text'
import { COLORS, LAYOUT } from 'StyleConfig'
import Slider from 'react-native-slider'

let icons = {
  'play': require('../../../assets/img/play@2x.png'),
  'stop': require('../../../assets/img/pause@2x.png')
}

class guideAudioList extends Component {

  state = {
    firstMount: true,
    playing: false,
    active: false, // accordion
    animationHeight: new Animated.Value()
  }

  _setMaxHeight (event) {
    const {firstMount} = this.state
    if (firstMount) {
      this.setState({
        maxHeight: event.nativeEvent.layout.height,
        firstMount: false
      })
      this.state.animationHeight.setValue(0)
    }
  }

  _toggleAudioView () {
    const { active, maxHeight } = this.state
    // let initHeight = active ? minHeight + maxHeight : minHeight
    // let finalHeight = active ? minHeight : maxHeight + minHeight
    const height = active ? 0: maxHeight

    this.setState({
      active: !active
    })

    Animated.spring(
      this.state.animationHeight,
      {
        toValue: height
      }
    ).start()
  }

  _seek (value) {
    // if (this.state.playing) {
    //   if (this.state.duration) {
    //     let seekTime = (value / 100) * this.state.duration
    //     this.player.seek(seekTime, () => {
    //       this.setState({
    //         progress: value
    //       })
    //     })
    //   }
    // }
  }

  _onPress () {
      if (this.state.playing) {
        this.setState({
          playing: false
        })
        // this.player.pause()
      } else {
        this.setState({
          playing: true
        })
        // this.player.play(() => {
        //   this.setState({
        //     duration: this.player.duration,
        //     playing: true,
        //     sliderThumbStatus: false
        //   })
        // })
      }
  }

  render () {
    let icon = this.state.playing? icons['stop']: icons['play']

    return (
      <View style={styles.container}>
        <View>
          <TouchableHighlight
            onPress={this._toggleAudioView.bind(this)}
            underlayColor={COLORS.pureWhite}
          >
            <View style={LAYOUT.horizontal}>
              <H3 bold>{this.props.title}</H3>
              <H4 green style={styles.timeText}>{this.props.time}</H4>
            </View>
          </TouchableHighlight>
        </View>

        <Animated.View
          style={[styles.animationView, {height: this.state.animationHeight}]}
          onLayout={this._setMaxHeight.bind(this)}
        >
          <Slider
            value={this.state.progress}
            step={1}
            maximumValue={100}
            onSlidingComplete={this._seek.bind(this)}
            trackStyle={styles.track}
            thumbStyle={[styles.trackThumb, this.state.sliderThumbStatus ? styles.trackThumbDisable : styles.trackThumbActive]}
            minimumTrackTintColor={COLORS.green}
            thumbTouchSize={{width: 20, height: 20}}
            disabled={this.state.sliderThumbStatus}
          />
          <TouchableHighlight
            onPress={this._onPress.bind(this)}
            underlayColor={COLORS.pureWhite}
            style={styles.pp}
          >
            <Image
              source={icon}
              style={styles.ppImage}
            />
          </TouchableHighlight>
        </Animated.View>
      </View>
    )
  }
}

const styles = {
  container: {
    marginBottom: 11,
    marginTop: 11
  },
  animationView: {
    overflow: 'hidden'
  },
  timeText: {
    height: 17
  },
  track: {
    height: 2,
    borderRadius: 2,
    backgroundColor: COLORS.lightGray
  },
  trackThumb: {
    top: 22,
    width: 20,
    height: 20,
    borderRadius: 30 / 2,
    borderWidth: 2
  },
  trackThumbDisable: {
    backgroundColor: COLORS.pureWhite,
    borderColor: COLORS.lightGray
  },
  trackThumbActive: {
    backgroundColor: COLORS.pureWhite,
    borderColor: COLORS.green
  },
  pp: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  ppImage: {
    height: 40,
    width: 40
  }
}

export default guideAudioList
