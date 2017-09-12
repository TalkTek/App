// @flow
'use strict'

import React, { Component } from 'react'
import {
  View,
  Image,
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
import { Actions } from 'react-native-router-flux'
import ListIcon from '../../components/img/icon/SmallIcon'
import OpenIcon from '../../components/img/icon/LargeIcon'
import Avatar from '../../components/img/Thumbnail/LargeThumb'
import Listitem from './Listitem'
import { H4 } from '../../components/text'
import { Button } from '../../components/button'
import {auth} from '../../lib/firebase'

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

  _logout = () => {
    this.props.logout()
    Actions.login()
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
            this.props.memberUid && this.props.memberAvatar ?
              { uri: this.props.memberAvatar } :
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
            {this._renderUserAvater()}
          </View>
          <View style={styles.container}>
              <Listitem listsData={this.listsData}/>
            {
              this.props.memberUid
              &&
              <Button 
                text="登出" 
                border={1}
                borderRadius={8}
                textSize='h4'
                padding={12}
                onPress={this._logout}
                style={styles.logout}
                />  
            }
          </View>
        </Content>
      </Container>
    )
  }
}
