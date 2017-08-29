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
    flexDirection: 'row'
  }
}

const { width } = Dimensions.get('window')

class ScrollBanner extends Component {
  state = {
    index: 0,
    scrollPercent: new Animated.Value(0)
  }

  timer = null

  touchPosition = null

  componentDidMount() {
    this.startTimer()
  }
  
  _animateScroll = () => {
    const {index} = this.state
    const imgList = this.props.source
    this._changeImg()
    this.state.scrollPercent.setValue(width*(index>imgList.length-1?0:index)*-1)
    this.scrollAnimate()
  }

  scrollAnimate() {
    const totalTime = this.props.totalTime||1000
    const {index} = this.state
    Animated.timing(
      this.state.scrollPercent,
      {
        toValue: width * index * -1,
        ease: Easing.back,
        duration: totalTime
      }
    ).start()
  }

  _changeImg() {
    const imgList = this.props.source
    let {index} = this.state
    if (index+1 <= imgList.length) {
      index ++
    } else {
      index = 0
    }
    
    this.setState({
      index: index
    })
  }

  _touchStart = (e) => {
    this.touchPosition = e.nativeEvent.pageX
    clearInterval(this.timer)
  }
  
  _touchMove = (e) => {
    const {index} = this.state
    const position = width*index*-1
    const offset = e.nativeEvent.pageX - this.touchPosition

    this.state.scrollPercent.setValue(position+offset)
  }

  _touchEnd = (e) => {
    const imgList = this.props.source
    const offset = e.nativeEvent.pageX - this.touchPosition
    let {index} = this.state
    if (offset>width*0.3) {
      index = (index-1<0)? imgList.length-1:index - 1
    } 
    if (offset<width*-0.3) {
      index = (index+1>imgList.length)? 1:index + 1
    }
    
    this.setState({
      index
    }, () =>this.scrollAnimate())
    this.startTimer()
  }

  startTimer() {
    const timeOut = 2000
    const {source: imgList} = this.props
    if (imgList.length>1)
      this.timer = setInterval(this._animateScroll, timeOut)
  }

  render() {
    const {scrollPercent, index} = this.state
    const {source} = this.props
    
    return (
      <View 
        onTouchStart={this._touchStart}
        onTouchMove={this._touchMove}
        onTouchEnd={this._touchEnd}
        style={style.wrapper} removeClippedSubviews>
        {/* scroll view */}
        <Animated.View style={[style.scroller, {
          left: scrollPercent
        }]}>
          {
            source.map((ele, index) => {
              return (
                <Banner source={ele} key={index} />
              )
            })
          }
          <Banner source={source[0]} />
        </Animated.View>
      </View>
    )
  }
}

export default ScrollBanner
