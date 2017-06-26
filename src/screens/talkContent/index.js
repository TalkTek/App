// @flow
'use strict'
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native';
import IntroAccordion from './introAccordion'
import Info from './info'
import GuideList from './guideList'
import { Container, Content } from 'native-base'

class TalkContent extends Component {
  render () {
    return (
      <Container>
        <Content>
          <Info />
          <View style={styles.division} />
          <IntroAccordion />
          <View style={styles.division} />
          <GuideList />
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  division: {
    height: 8,
    backgroundColor: 'rgb(250, 250, 250)'
  }
})

export default TalkContent
