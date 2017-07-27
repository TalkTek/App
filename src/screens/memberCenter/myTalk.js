import React, { Component } from 'react'
import {
  View
} from 'react-native'
import { connect } from 'react-redux'
import PostList from './postList'

@connect((state) => ({

}))

class MyTalk extends Component {
  render() {
    return (
      <PostList />
    )
  }
}

export default MyTalk
