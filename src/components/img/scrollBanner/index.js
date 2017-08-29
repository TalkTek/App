import React, { Component } from 'react'
import Banner from '../banner/fullWidthBanner'
import {
  View,
  Animated,
  Easing,
  Dimensions
} from 'react-native'

const style = {
  wrapper: {
    width: '100%',
    overflow: 'hidden',
    flexDirection: 'row'
  },
  scroller: {
    flexDirection: 'row',
    left: '-10%'
  }
}

const { width } = Dimensions.get('window')

class ScrollBanner extends Component {
  state = {
    index: 0,
    scrollPercent: new Animated.Value(0)
  }

  timer = null

  componentDidMount() {
    const totalTime = this.props.totalTime||1000
    const timeOut = 2000
    this.timer = setInterval(() => {
      this._changeImg()
      this.state.scrollPercent.setValue(0)
      Animated.timing(
        this.state.scrollPercent,
        {
          toValue: width * -1,
          ease: Easing.back,
          duration: totalTime
        }
      ).start()
    }, timeOut)
  }

  _changeImg() {
    const imgList = this.props.source
    let {index} = this.state
    if (index+1 < imgList.length) {
      index ++
    } else {
      index = 0
    }
    
    this.setState({
      index: index
    })
  }

  render() {
    const {scrollPercent, index} = this.state
    const {source} = this.props
    
    return (
      <View style={style.wrapper} removeClippedSubviews>
        {/* scroll view */}
        <Animated.View style={[style.scroller, {
          left: scrollPercent
        }]}>
          <Banner source={source[index]} />
          <Banner source={index+1>source.length-1?source[0]: source[index+1]} />
        </Animated.View>
      </View>
    )
  }
}

export default ScrollBanner
