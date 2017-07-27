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
  componentDidMount() {
    this.props.actions.memberCapsuleGet(this.props.Uid)
  }

  render() {
    return (
      <PostList data={this.props.favoriteCapsule || []} />
    )
  }
}

export default MyCapsule
