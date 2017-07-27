import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import {
  View,
  Text
} from 'react-native'
import { connect } from 'react-redux'
import MemberAction from '../../reducer/member/memberAction'
import PostList from './postList'

@connect((state) => ({
  Uid: state.member.uid,
  favoriteCapsule: state.member.favoriteCapsule
}), (dispatch) => ({
  actions: bindActionCreators(MemberAction, dispatch)
}))

class MyCapsule extends Component {
  data = {
    0: { author: '馬那熊 | PTT CATCH 版 版主', content: '愛情是場捉迷藏：關係經營的有效方法之..', date: '2017-06-01 15:02' },
    1: { author: '馬那熊 | PTT CATCH 版 版主', content: '愛情是場捉迷藏：關係經營的有效方法之..', date: '2017-06-01 15:02' },
  }

  componentDidMount() {
    this.props.actions.memberCapsuleGet(this.props.Uid)
  }

  render() {
    return (
      <PostList data={this.props.favoriteCapsule} />
    )
  }
}

export default MyCapsule
