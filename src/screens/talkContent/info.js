// @flow
'use strict'

import React, { Component } from 'react'
import { Image, View, Text, StyleSheet, Dimensions } from 'react-native'
import { Left, Right } from 'native-base'

const { width } = Dimensions.get('window')
let margin = Number(((width)*0.06).toFixed())


export default class Info extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.main}>
        <View>
          <Image
            style={styles.bannerImage}
            source={require('../../assets/img/banner@2x.png')}
          />
        </View>
        <View style={styles.thumbnail}>
          <Image
            source={require('../../assets/img/profilePicture2.png')}
            style={styles.thumbnailImage}
          />
          <Text style={styles.thumbnailText}>
            瑪那熊 | PTT Catch版版主
          </Text>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>
            愛情是場捉迷藏：關係經營的有效方法是你是『抓人鬼』還是『鬼抓你』
          </Text>
        </View>
        <View style={styles.hr}></View>
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
  bannerImage : {
    width: '100%',
  },
  thumbnail: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 12,
  },
  thumbnailImage: {
    width: 32,
    height: 32,
    marginLeft: margin,
    marginRight: margin,
  },
  thumbnailText: {
    paddingTop: 8,
    fontSize: 12,
  },
  title: {
    marginLeft: margin,
    marginRight: margin,
    padding: 0,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
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


