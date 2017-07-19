// @flow
'use strict'

import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity
} from 'react-native'
import {
  Thumbnail,
  Container,
  Content
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
        key={rowData.key}
        onPress={() => this.props.navigation.navigate(rowData.target)} 
        style={[styles.mainBackground, styles.listItem]}>
        <View style={styles.listItemLeft}>
          <Image 
            source={rowData.icon}
            style={styles.listIcon}
          />
          <Text 
            style={styles.listText}
          >
            {rowData.text}
          </Text>
          {
            rowData.rightText &&
            <Text style={styles.listRightText}>
              {rowData.rightText}
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
      <Container style={styles.container}>
        <Content>
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
            
            <View style={styles.selectList}>
              { this.listsData.my.map(this._renderListItem.bind(this)) }
            </View>
            <View style={styles.selectList}>
              { this.listsData.coin.map(this._renderListItem.bind(this)) }
            </View>
            <View style={styles.selectList}>
              { this.listsData.other.map(this._renderListItem.bind(this)) }
            </View>
            <View style={styles.logout}>
              <Button 
                color="#212121" 
                title="登出"
                onPress={() => {}}
              />
            </View>
          </View>
        </Content>
      </Container>
    )
  }
}
