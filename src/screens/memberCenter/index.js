// @flow
'use strict'

import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  Image,
  FlatList,
  Button
} from 'react-native'
import {
  Thumbnail
} from 'native-base'
import styles from './styles'

export default class MemberCenter extends Component {
  
  listsData = {
    my: [
      { target: '', icon: 'enter.png', text: '我的小講' }
    ],
    coin: [
      { target: '', icon: '', rightText: '500點', text: '我的點數' },
      { target: '', icon: '', text: '儲值中心' }
    ],
    other: [
      { target: '', icon: '', text: '意見回饋' },
      { target: '', icon: '', text: '成為講師' }
    ]
  }

  _renderListItem(rowData) {
    return (
      <View key={rowData.item.text} style={[styles.mainBackground, styles.listItem]}>
        <View style={styles.listItemLeft}>
          <Image 
            source={require('../../assets/img/tabIcon/lecture/lec_active.png')} 
            style={styles.listIcon}
          />
          <Text 
            style={styles.listText}
          >
            {rowData.item.text}
          </Text>
          {
            rowData.item.rightText &&
            <Text style={styles.listRightText}>
              {rowData.item.rightText}
            </Text>
          }
        </View>
        <View style={styles.listItemMore}>
          <Image 
            source={require('../../assets/img/memberCenter/enter.png')}
          />
        </View>
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={[styles.mainBackground, styles.avatar]}>
          <Image 
            source={require('../../assets/img/banner.png')}
            style={styles.avatarImg}
            large
          />
          <Text style={styles.email}>
            a9650615@gmail.com
          </Text>
          <View style={styles.moreInfo}>
            <Image source={require('../../assets/img/memberCenter/enter.png')} />
          </View>
        </View>
        <View style={[styles.container]}>
          <FlatList
            key="my"
            data={this.listsData.my}
            renderItem={this._renderListItem}
            style={styles.selectList}
          />
          <FlatList
            key="coin"
            data={this.listsData.coin}
            renderItem={this._renderListItem}
            style={styles.selectList}
          />
          <FlatList
            key="other"
            data={this.listsData.other}
            renderItem={this._renderListItem}
            style={styles.selectList}
          />
          <View style={styles.logout}>
            <Button color="#212121" title="登出" />
          </View>
        </View>
      </ScrollView>
    )
  }
}
