// @flow
'use strict'

import React, { Component } from 'react'
import {
  View,
  Image,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions
} from 'react-native'
import {
  Thumbnail,
  Container,
  Content,
} from 'native-base'
import styles from './styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import memberAction from '../../reducer/member/memberAction'
import analyticAction from '../../reducer/analytic/analyticAction'
import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import ListIcon from '../../components/img/icon/SmallIcon'
import OpenIcon from '../../components/img/icon/LargeIcon'
import Avatar from '../../components/img/Thumbnail/LargeThumb'
import { H4 } from '../../components/text'

const { width: screenWidth } = Dimensions.get('window')

@connect(state => ({
  memberUid: state.member.uid,
  memberEmail: state.member.email,
  memberAvatar: state.member.avatarUrl
}), dispatch => ({
  logout: bindActionCreators(memberAction.logoutMember, dispatch),
  ga: bindActionCreators(analyticAction, dispatch)
}))

export default class MemberCenter extends Component {
  listsData = {
    // my: [{
    //   key: 'iconmyTalk',
    //   icon: require(`../../assets/img/memberCenter/iconmyTalk.png`),
    //   target: 'MyTalk',
    //   text: '我的小講'
    //   }, {
    //   key: 'iconmyCapsule',
    //   icon: require(`../../assets/img/memberCenter/iconmyTalk.png`),
    //   target: 'MyCapsule',
    //   text: '我的膠囊收藏'
    // }],
    // coin: [
    //   { key: 'iconMypoint', icon: require(`../../assets/img/memberCenter/iconMypoint.png`), target: 'MyPoint', rightText: '500點', text: '我的點數' },
    //   { key: 'iconFillup', icon: require(`../../assets/img/memberCenter/iconFillup.png`), target: 'Fillup', text: '儲值中心' }
    // ],
    other: [{
      key: 'iconFeedback',
      icon: require(`../../assets/img/memberCenter/iconFeedback.png`),
      target: 'Feedback',
      text: '意見回饋',
      func: () => Actions.feedback()
    },
      // { key: 'iconApply', icon: require(`../../assets/img/memberCenter/iconApply.png`), target: 'Apply', text: '成為講師' }
    ]
  }

  componentDidMount() {
    this.props.ga.gaSetScreen('MemberCenter')
  }

  _logout = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        Actions.login()
      })
      .catch((error) => {
          console.warn('[SignOut Error] Messages is', error.message)
      })
  }

  _renderListItem = (rowData: Object) => {
    return (
      <TouchableOpacity
        key={rowData.key}
        onPress={() => Actions.feedback()}
        style={[styles.mainBackground, styles.listItem]}
        >
        <View style={styles.listItemLeft}>
          <ListIcon
            source={rowData.icon}
            marginLeft={24}
          />
          <H4 style={styles.listText}>
            {rowData.text}
          </H4>
          {
            rowData.rightText &&
            <H4 green style={styles.listRightText}>
              {rowData.rightText}
            </H4>
          }
        </View>
        <View style={styles.listItemMore}>
          <OpenIcon
            source={require('../../assets/img/memberCenter/enter.png')}
          />
        </View>
      </TouchableOpacity>
    )
  }

  _renderUserAvater = () => {
    return (
      <View style={[styles.mainBackground, styles.avatar]}>
        <Avatar
          source={
            this.props.memberUid?
            { uri: this.props.memberAvatar }:
            require('../../assets/img/memberCenter/profileIcon.png')
          }
          borderRadius={40}
        />
        <H4 
          style={styles.email} 
          onPress={() => {
            if (!this.props.memberUid) {
              Actions.login()
            }
          }}
        >
          { this.props.memberUid? this.props.memberEmail: '登入' }
        </H4>
        {
          this.props.memberUid &&
          <TouchableOpacity onPress={() => Actions.memberInfo()} style={styles.moreInfo}>
            <OpenIcon
              source={require('../../assets/img/memberCenter/enter.png')}
            />
          </TouchableOpacity>
        }
      </View>
    )
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <View>
            { this._renderUserAvater() }
          </View>
          <View style={styles.container}>
            
            {/*<View style={styles.selectList}>*/}
              {/*{ this.listsData.my.map(this._renderListItem) }*/}
            {/*</View>*/}
            {/*<View style={styles.selectList}>*/}
              {/*{ this.listsData.coin.map(this._renderListItem) }*/}
            {/*</View>*/}
            <View style={styles.selectList}>
              { this.listsData.other.map(this._renderListItem) }
            </View>
            {
              this.props.memberUid
              &&
              <TouchableHighlight
                color="#212121"
                onPress={this._logout}
                style={styles.logout}
                underlayColor="#fff"
              >
                <View>
                  <H4>登出</H4>
                </View>
              </TouchableHighlight>
            }
          </View>
        </Content>
      </Container>
    )
  }
}
