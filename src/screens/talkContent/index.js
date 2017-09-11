// @flow
'use strict'
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native';
import IntroAccordion from './introAccordion'
import Info from './info'
import GuideList from './guideList'
import { Container, Content } from 'native-base'
import Firebase from '../../api/Firebase'
import LectureApi from './lectureApi'

const styles = {
  division: {
    height: 8,
    backgroundColor: 'rgb(250, 250, 250)'
  }
}

class TalkContent extends Component {
  state = {
    lecture: {}
  }
  componentDidMount () {
    let x = new LectureApi().load('-KsbLuHV-r5IMNEz5QUy')
    x.then((x) => {
      console.log(x)
      this.setState({lecture: x})
    })
  }
  render () {
    return (
      <Container>
        <Content>
          <Info lectureTitle={this.state.lecture.lectureTitle}/>
          <View style={styles.division} />
          <IntroAccordion intro={this.state.lecture.intro}/>
          <View style={styles.division} />
          <GuideList />
        </Content>
      </Container>
    )
  }
}

export default TalkContent
