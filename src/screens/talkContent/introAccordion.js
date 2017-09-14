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
} from 'react-native'
import { H3 } from '../../components/text'
import { LAYOUT } from 'StyleConfig'

// const { width } = Dimensions.get('window')

export default class IntroAccordion extends Component {

  icons = {
    'extend': require('../../assets/img/extend.png'),
    'close': require('../../assets/img/close.png'),
  }

  state = {
    active: false,
    animation: new Animated.Value(),
    minHeight: 100,
    maxHeight: 100
  }

  toogle() {
    const { active, minHeight, maxHeight } = this.state
    let finalValue = active? minHeight: maxHeight

    this.setState({
      active: !active,
    })

    Animated.spring(
      this.state.animation,
      {
        toValue: finalValue
      }
    ).start()
  }

  _setMaxHeight(event) {
    const { minHeight } = this.state
    this.state.animation.setValue(minHeight)
    this.setState({
      maxHeight: event.nativeEvent.layout.height
    })
  }

  getIconLink () {
    let iconLink = this.icons['extend']
    if(this.state.active) {
      iconLink = this.icons['close']
    }

    return iconLink
  }
  render() {
    let introHiddenComponent  =
      <H3 style={styles.hiddenComponent}>
        {this.props.intro}
      </H3>

    return (
      <View style={[LAYOUT.vertical, styles.container]}>
        <H3 bold style={styles.title}>簡介</H3>
        <Animated.View
          style={[styles.animationView, {height: this.state.animation}]}
        >
          <View onLayout={this._setMaxHeight.bind(this)}>
            {introHiddenComponent}
          </View>
        </Animated.View>
        <TouchableHighlight
          onPress={this.toogle.bind(this)}
          underlayColor="#fff"
          style={[LAYOUT.horizontal, styles.icon]}
        >
          <Image
            style={styles.iconImage}
            source={this.getIconLink()}
          />
        </TouchableHighlight>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingLeft: 25,
    paddingRight: 25,
  },
  title: {
    marginTop:16,
    marginBottom: 12
  },
  animationView: {
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  hiddenComponent: {
    lineHeight: 20,
  },
  icon: {
    justifyContent: 'center'
  },
  iconImage: {
    backgroundColor: '#fff',
    width: 24,
    height: 24
  }
})
