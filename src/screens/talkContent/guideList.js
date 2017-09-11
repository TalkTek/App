// @flow
'use strict'

import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'
import { H3, H4 } from '../../components/text'
import { COLORS, LAYOUT } from 'StyleConfig'
import GuideAudioList from './component/guideAudioList'
// import {
//   Player
// } from 'react-native-audio-toolkit'

export default class GuideList extends Component {
  componentWillMount () {
    // this.player = null
    // this._createPlayer()
  }

  // _createPlayer () {
  //   if (this.player) {
  //     this.player.destroy()
  //   }


  //   this.player = new Player(audioUrl1)
  //     .prepare((err) => {
  //       if(err) {
  //         console.log('error at _createPlayer()')
  //         console.log('err is', err)
  //       }
  //     })
  // }

  render () {
    return (
      <View style={styles.container}>
        <H3 style={styles.caption}>講單</H3>
        <View>
          <View style={styles.hr} />
          <View style={styles.divideSection}>
            <View style={styles.rec} />
            <H3 style={styles.divideText}>未來，屬於知識型網紅</H3>
          </View>
          <View style={styles.hr} />
          <GuideAudioList 
            title="什麼是『 知識型網紅 』？"
            time="01:46"
            />
          <View style={styles.hr} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.pureWhite,
    paddingLeft: 25,
    paddingRight: 25
  },
  caption: {
    marginTop: 16,
    marginBottom: 15
  },
  divideSection: {
    ...LAYOUT.horizontal,
    justifyContent: 'flex-start',
    marginTop: 16,
    marginBottom: 16
  },
  rec: {
    backgroundColor: COLORS.green,
    width: 6,
    height: 17
  },
  divideText: {
    marginLeft: 10
  },
  pp: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  ppImage: {
    height: 40,
    width: 40
  },
  hr: {
    height: 1,
    width: '100%',
    backgroundColor: COLORS.lightGray
  }
})
