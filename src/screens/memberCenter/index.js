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
import navigatorAction from '../../reducer/navigator/navigatorAction'
import { NavigationActions } from 'react-navigation'

const { width: screenWidth } = Dimensions.get('window')

console.log('width isis', screenWidth)


@connect(state => ({
  memberUid: state.member.uid,
  memberEmail: state.member.email,
  memberAvatar: state.member.avatarUrl
}), dispatch => ({
  actions: bindActionCreators(navigatorAction, dispatch),
  ga: bindActionCreators(analyticAction, dispatch)
}))

export default class MemberCenter extends Component {
  listsData = {
    my: [
      { key: 'iconmyTalk', icon: require(`../../assets/img/memberCenter/iconmyTalk.png`), target: 'MyTalk', text: '我的小講' },
      { key: 'iconmyCapsule', icon: require(`../../assets/img/memberCenter/iconmyTalk.png`), target: 'MyCapsule', text: '我的膠囊收藏' }
    ],
    // coin: [
    //   { key: 'iconMypoint', icon: require(`../../assets/img/memberCenter/iconMypoint.png`), target: 'MyPoint', rightText: '500點', text: '我的點數' },
    //   { key: 'iconFillup', icon: require(`../../assets/img/memberCenter/iconFillup.png`), target: 'Fillup', text: '儲值中心' }
    // ],
    other: [
      { key: 'iconFeedback', icon: require(`../../assets/img/memberCenter/iconFeedback.png`), target: 'Feedback', text: '意見回饋' },
      // { key: 'iconApply', icon: require(`../../assets/img/memberCenter/iconApply.png`), target: 'Apply', text: '成為講師' }
    ]
  }

  componentDidMount() {
    this.props.ga.gaSetScreen('MemberCenter')
  }

  _logout = async () => {
    const {
      navigation,
      actions
    } = this.props

    console.log('this.props', this.props)


    // actions.logout()
    await firebase
      .auth()
      .signOut()
      .then(() => {

        navigation._toggleAudioBarDown()
        navigation.navigate('Login')
        // navigation.dispatch(
        // NavigationActions.reset({
        //   index: 0,
        //   actions: [
        //     navigation.navigate({ routeName: 'Login' })
        //   ]
        // }))
      })
      .catch((error) => {
        console.warn('[SignOut Error] Messages is', error.message)
      })
  }

  _renderListItem = (rowData) => {
    return (
      <TouchableOpacity
        key={rowData.key}
        onPress={() => this.props.navigation.navigate(rowData.target)} 
        style={[styles.mainBackground, styles.listItem]}
        >
        <View style={styles.listItemLeft}>
          <Image 
            source={rowData.icon}
            style={styles.listIcon}
          />
          <Text style={styles.listText}>
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

  _renderUserAvater = () => {
    return (
      <View style={[styles.mainBackground, styles.avatar]}>
        <Image 
          source={
            this.props.memberUid?
            { uri: this.props.memberAvatar }:
            require('../../assets/img/memberCenter/profileIcon.png')
          }
          style={styles.avatarImg}
          large
        />
        <Text 
          style={styles.email} 
          onPress={() => {
            if (!this.props.memberUid) {
              this.props.navigation.navigate('Login')
            }
          }}
        >
          { this.props.memberUid? this.props.memberEmail: '登入' }
        </Text>
        {
          this.props.memberUid &&
          <TouchableOpacity onPress={() => this.props.navigation.navigate('MemberInfo')} style={styles.moreInfo}>
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
                <Text>登出</Text>
              </TouchableHighlight>
            }
          </View>
        </Content>
      </Container>
    )
  }
}
