// @flow
'use strict'

import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  Image,
  FlatList,
  Button,
  TouchableOpacity
} from 'react-native'
import {
  Thumbnail
} from 'native-base'
import styles from './styles'

export default class MemberCenter extends Component {
  listsData = {
    my: [
      { key: 'iconmyTalk', icon: require(`../../assets/img/memberCenter/iconmyTalk.png`), target: 'MyTalk', text: '我的小講' }
    ],
    coin: [
      { key: 'iconMypoint', icon: require(`../../assets/img/memberCenter/iconMypoint.png`), target: 'MyPoint', rightText: '500點', text: '我的點數' },
      { key: 'iconFillup', icon: require(`../../assets/img/memberCenter/iconFillup.png`), target: 'Fillup', text: '儲值中心' }
    ],
    other: [
      { key: 'iconFeedback', icon: require(`../../assets/img/memberCenter/iconFeedback.png`), target: 'Feedback', text: '意見回饋' },
      { key: 'iconApply', icon: require(`../../assets/img/memberCenter/iconApply.png`), target: 'Apply', text: '成為講師' }
    ]
  }

  _renderListItem(rowData) {
    return (
      <TouchableOpacity 
        onPress={() => this.props.navigation.navigate(rowData.item.target)} style={[styles.mainBackground, styles.listItem]}>
        <View style={styles.listItemLeft}>
          <Image 
            source={rowData.item.icon}
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
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={[styles.mainBackground, styles.avatar]}>
          <Image 
            source={require('../../assets/img/memberCenter/profileIcon.png')}
            style={styles.avatarImg}
            large
          />
          <Text style={styles.email}>
            wangshihe@gmail.com
          </Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('MemberInfo')} style={styles.moreInfo}>
            <Image source={require('../../assets/img/memberCenter/enter.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <FlatList
            data={this.listsData.my}
            renderItem={this._renderListItem.bind(this)}
            style={styles.selectList}
          />
          <FlatList
            data={this.listsData.coin}
            renderItem={this._renderListItem.bind(this)}
            style={styles.selectList}
          />
          <FlatList
            data={this.listsData.other}
            renderItem={this._renderListItem.bind(this)}
            style={styles.selectList}
          />
          <View style={styles.logout}>
            <Button 
              color="#212121" 
              title="登出"
              onPress={() => {}}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}
