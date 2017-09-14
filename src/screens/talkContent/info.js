// @flow
'use strict'

import React, { Component } from 'react'
import { Image, View, Text, StyleSheet, Dimensions } from 'react-native'
import { Left, Right } from 'native-base'
import { H2, H4 } from '../../components/text'
import { COLORS, LAYOUT } from 'StyleConfig'

const { width, height } = Dimensions.get('window')
let margin = Number(((width) * 0.06).toFixed())

export default class Info extends Component {
  images = {
    avatar: require('../../assets/img/bubu.png'),
    banner: require('../../assets/img/demo_banner.jpg')
  }
  _renderAvatar() {
    return (
      <View style={styles.thumbnail}>
        <Image
          source={this.images.avatar}
          style={styles.thumbnailImage}
        />
        <H4 style={styles.thumbnailText}>
          艾希莉布 | Talk小講編輯部
        </H4>
      </View>
    )
  }

  _renderTag () {
    const style = {
      marginTop: 8
    }

    return (
      <View style={style}>
        <H4 green>#網紅 #賺錢 #小資時代</H4>
      </View>
    )
  }

  _renderTime () {
    const style = {
      marginTop: 8
    }

    return (
      <View style={style}>
        <H4 gray>2017.06.10 PM 04:02</H4>
      </View>
    )
  }
  render () {
    return (
      <View style={styles.bg}>
        <View>
          <Image
            style={styles.bannerImage}
            source={this.images.banner}
          />
        </View>
        <View style={styles.main}>
          {this._renderAvatar()}
          <View style={styles.title}>
            <H2 bold>
              {this.props.lectureTitle}
            </H2>
          </View>
          {this._renderTag()}
          {this._renderTime()}
          <View style={styles.hr} />
          <View style={styles.restInfo}>
            <Left>
              <H4 style={styles.restInfoText}>累積100人次收聽</H4>
            </Left>
            <Right>
              <H4 style={styles.restInfoText}>25分鐘語音</H4>
            </Right>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: COLORS.pureWhite
  },
  main: {
    backgroundColor: COLORS.pureWhite,
    marginLeft: 25,
    marginRight: 25
  },
  bannerImage: {
    resizeMode: 'cover',
    width: '100%',
    height: 140
  },
  thumbnail: {
    ...LAYOUT.horizontal,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 12
  },
  thumbnailImage: {
    width: 32,
    height: 32,
    borderRadius: 15
  },
  thumbnailText: {
    marginLeft: 18
  },
  title: {
    marginTop: 8,
    marginBottom: 8
  },
  hr: {
    marginTop: 8,
    marginBottom: 12,
    height: 1,
    width: '100%',
    backgroundColor: COLORS.lightGray,
  },
  restInfo: {
    ...LAYOUT.horizontal,
    paddingBottom: 12
  },
  restInfoText: {
    letterSpacing: 1,
  },
})
