import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  TouchableHighlight,
  View,
  Text,
  Animated,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window')

let margin = Number((width*0.04).toFixed())


export default class IntroAccordion extends Component {

  icons = {
    'extend': require('../../assets/img/extend.png'),
    'close': require('../../assets/img/close.png'),
  }

  constructor(props) {
    super(props)

    this.state = {
      active: false,
      animation: new Animated.Value()
    }
  }

  toogle() {
    const { active, minHeight, maxHeight } = this.state
    let initialValue = active? minHeight + maxHeight : minHeight,
      finalValue = active? minHeight : maxHeight + minHeight

    this.setState({
      active: !active,
    })

    this.state.animation.setValue(initialValue)
    Animated.spring(
      this.state.animation,
      {
        toValue: finalValue
      }
    ).start()
  }

  _setMinHeight(event) {
    this.state.animation.setValue(event.nativeEvent.layout.height)
    this.setState({
      minHeight: event.nativeEvent.layout.height
    })
  }

  _setMaxHeight(event) {
    this.setState({
      maxHeight: event.nativeEvent.layout.height
    })
  }

  render() {

    let iconLink = this.icons['extend']
    if(this.state.active) {
      iconLink = this.icons['close']
    }

    let introVisibleComponent =
      <Text style={styles.visibleComponent}>
        在兩性相處上曾跌跌撞撞，經歷過三天小吵五天鬧分手的感情，也遇過動輒以情緒勒索、言語攻擊的伴侶，當然也遇到被劈腿的慘事
      </Text>

    let introHiddenComponent  =
      <Text style={styles.hiddenComponent}>
        。從運動減重、摸索穿搭開始，在瘦了將近20公斤後逐漸建立自信心。與幾任女友交往過程中，發現愛情不只有“追求”要學習，追求之前須先“了解自己想要什麼”，追求成功後更得“了解如何與對方相處”，甚至在一段感情結束後，要知道“如何照顧自己，重新醞釀能量”。
      </Text>

    return (
      <View style={styles.container}>
        <Text style={styles.title}>簡介</Text>
        <Animated.View
          style={[styles.animationView, {height: this.state.animation}]}
        >
          <View onLayout={this._setMinHeight.bind(this)}>
            {introVisibleComponent}
          </View>
          <View onLayout={this._setMaxHeight.bind(this)}>
            {introHiddenComponent}
          </View>
        </Animated.View>
        <TouchableHighlight
          onPress={this.toogle.bind(this)}
          underlayColor="#fff"
          style={styles.icon}
        >
          <Image
            style={styles.iconImage}
            source={iconLink}
          />
        </TouchableHighlight>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    backgroundColor: '#fff',
    paddingLeft: margin,
    paddingRight: margin,
  },
  title: {
    fontSize: 15,
    marginTop:16,
    marginBottom: 8,
    marginLeft: 9,
  },
  animationView: {
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  visibleComponent: {
    marginTop: 8,
    fontSize: 13,
    marginLeft: 9,
  },
  hiddenComponent: {
    marginTop: 8,
    fontSize: 13,
    marginLeft: 9,
  },
  icon: {
    flexDirection: 'row',
    justifyContent:'center',
    backgroundColor: '#fff',
  },
  iconImage: {
    backgroundColor: '#fff',
    width: 24,
    height: 24,
  },
})
