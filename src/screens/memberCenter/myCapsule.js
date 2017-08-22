import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import {
  View,
  Text
} from 'react-native'
import { connect } from 'react-redux'
import MemberAction from '../../reducer/member/memberAction'
import analyticAction from '../../reducer/analytic/analyticAction'
import PostList from './postList'

@connect((state) => ({
  Uid: state.member.uid,
  favoriteCapsule: state.member.favoriteCapsule
}), (dispatch) => ({
  actions: bindActionCreators(MemberAction, dispatch),
  ga: bindActionCreators(analyticAction, dispatch)
}))

class MyCapsule extends Component {
  componentDidMount() {
    this.props.ga.gaSetScreen('MyCapsule')
  }

  render() {
    return (
      <PostList data={this.props.favoriteCapsule || []} />
    )
  }
}

export default MyCapsule
