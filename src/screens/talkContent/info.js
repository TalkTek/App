// @flow
'use strict'

import React, { Component } from 'react'
import { Image, View, Text, StyleSheet, Dimensions } from 'react-native'
import { Left, Right } from 'native-base'

const { width, height } = Dimensions.get('window')
let margin = Number(((width) * 0.06).toFixed())

export default class Info extends Component {
  constructor (props: any) {
    super(props)
  }

  render () {
    return (
      <View style={styles.main}>
        <View>
          <Image
            style={styles.bannerImage}
            source={require('../../assets/img/demo_banner.jpg')}
          />
        </View>
        <View style={styles.thumbnail}>
          <Image
            source={require('../../assets/img/bubu.png')}
            style={styles.thumbnailImage}
          />
          <Text style={styles.thumbnailText}>
            艾希莉布 | Talk小講編輯部
          </Text>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>
            {this.props.lectureTitle}
          </Text>
        </View>
        <View style={styles.hr} />
        <View style={styles.restInfo}>
          <Left>
            <Text style={styles.numberOfListener}>累積100人次收聽</Text>
          </Left>
          <Right>
            <Text style={styles.lengthOfVoice}>25分鐘語音</Text>
          </Right>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgb(255, 255, 255)',
  },
  bannerImage: {
    resizeMode: 'cover',
    width: width,
    height: 140
  },
  thumbnail: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 12
  },
  thumbnailImage: {
    width: 32,
    height: 32,
    marginLeft: margin,
    marginRight: margin,
    borderRadius: 15
  },
  thumbnailText: {
    paddingTop: 8,
    fontSize: 12
  },
  title: {
    marginLeft: margin,
    marginRight: margin,
    padding: 0,
    marginBottom: 8
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 20
  },
  hr: {
    marginLeft: margin,
    marginRight: margin,
    marginTop: 8,
    marginBottom: 12,
    height: 1,
    width: width - margin*2,
    backgroundColor: 'rgb(224, 224, 224)',
  },
  restInfo: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: margin,
    marginRight: margin,
    marginBottom: 12,
  },
  numberOfListener: {
    fontSize: 12,
    lineHeight: 17,
    letterSpacing: 1,
  },
  lengthOfVoice: {
    fontSize: 12,
    lineHeight: 17,
    letterSpacing: 1,
  },
})
