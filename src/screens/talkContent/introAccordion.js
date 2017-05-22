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
        專家預測,2020年美國將有50%的勞動人口-也就是近6000萬人,都是自由工
        作者。這告訴我們,未來會有愈來愈多人,不再倚賴公司或公司賦予的職位
        title,而是用個人品牌和專業在賺錢。
        我們大膽預言,未來,將是知識型網紅的時代。
      </Text>

    let introHiddenComponent  =
      <Text style={styles.hiddenComponent}>
        這是為什麼我們強烈建議每個人,即.刻.開.始將自己培養成一位知識型網紅。
        個人的品牌,並非只有像設計師、作家、藝術工作者等才需要培養,或是才能
        擁有的專利。你心中總會有個聲音,提醒你自己喜歡什麼、擅長什麼,其實,
        只需要擁有一件熱愛的事物,就可以開始你的知識型網紅成長之路。
        這次TALK小講將結合案例,手把手告訴你如何從零開始,將自己打造為不怕被
        未來職場趨勢淘汰的知識型網紅,甚至能獲得個人影響力,領先他人、活出自
        我,並且從中累積財富。拋開理論,這次我們要送給你的都是乾貨。準備好了,
        就跟著TALK小講,踏出你的第一步。
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
    fontSize: 14,
    marginLeft: 9,
    lineHeight: 20,
  },
  hiddenComponent: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
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
