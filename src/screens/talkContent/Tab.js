import React from 'react'
import {Scene, Stack} from 'react-native-router-flux'
import talkContent from './index'
import Icon from '../../components/img/icon/MediumIcon'
import {Tabstyles, TabIconLink} from '../Tabstyles'

export default (
  <Stack
    key='talkContent'
    tabBarLabel='小講'
    icon={(props) => {
      return (
        <Icon
          source={
            props.focused
              ? TabIconLink.active.talkContent
              : TabIconLink.inActive.talkContent
          }
        />
      )
    }}
  >
    <Scene
      initial
      key='talkContentlist'
      component={talkContent}
      title='小講'
      titleStyle={Tabstyles.titleStyle}
      navigationBarStyle={Tabstyles.headerStyle}
    />
  </Stack>

)
