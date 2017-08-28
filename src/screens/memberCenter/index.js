// @flow
'use strict'

import React, { Component } from 'react'
import {
  View,
  Text,
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
import Listitem from './Listitem'


const { width: screenWidth } = Dimensions.get('window')

console.log('width is', screenWidth)


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
    my: [{
      key: 'iconmyTalk',
      icon: require(`../../assets/img/memberCenter/iconmyTalk.png`),
      text: '我的小講',
      func: () => Actions.mytalk()
    }, {
      key: 'iconmyCapsule',
      icon: require(`../../assets/img/memberCenter/iconmyTalk.png`),
      text: '我的膠囊收藏',
      func: () => Actions.mycapsule()
    }],
    coin: [{
      key: 'iconMypoint',
      icon: require(`../../assets/img/memberCenter/iconMypoint.png`),
      rightText:'500點',
      text: '我的點數',
      func: () => Actions.mypoint()
    }, {
      key: 'iconFillup',
      icon: require(`../../assets/img/memberCenter/iconFillup.png`),
      text: '儲值中心',
      func: () => Actions.pointcenter()
    }],
    other: [{
      key: 'iconFeedback',
      icon: require(`../../assets/img/memberCenter/iconFeedback.png`),
      text: '意見回饋',
      func: () => Actions.feedback()
    }, {
      key: 'download',
      icon: require(`../../assets/img/memberCenter/iconFeedback.png`),
      text: '下載',
      func: () => Actions.download()
    },{
      key: 'iconApply',
      icon: require(`../../assets/img/memberCenter/iconApply.png`),
      text: '成為講師',
      func: () => Actions.apply()
    }]
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

  _renderUserAvater = () => {
    return (
      <View style={[styles.mainBackground, styles.avatar]}>
        <Image
          source={
            this.props.memberUid ?
              { uri: this.props.memberAvatar } :
              require('../../assets/img/memberCenter/profileIcon.png')
          }
          style={styles.avatarImg}
          large
        />
        <Text
          style={styles.email}
          onPress={() => {
            if (!this.props.memberUid) {
              Actions.login()
            }
          }}
        >
          {this.props.memberUid ? this.props.memberEmail : '登入'}
        </Text>
        {
          this.props.memberUid &&
          <TouchableOpacity onPress={() => Actions.memberInfo()} style={styles.moreInfo}>
            <Image source={require('../../assets/img/memberCenter/enter.png')} />
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
            {this._renderUserAvater()}
          </View>
          <View style={styles.container}>
              <Listitem listsData={this.listsData}/>
            {
              this.props.memberUid
              &&
              <TouchableHighlight
                color="#212121"
                onPress={this._logout}
                style={styles.logout}
                underlayColor="#fff"
              >
                <Text>登出</Text>
              </TouchableHighlight>
            }
          </View>
        </Content>
      </Container>
    )
  }
}
