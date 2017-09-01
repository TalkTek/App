import React from 'react'
import {Scene} from 'react-native-router-flux'
import KnowledgeCapsule from './index'
import Icon from '../../components/img/icon/MediumIcon'
import {Tabstyles, TabIconLink} from '../Tabstyles'

export default (
  <Scene
    key='knowledgeCapsule'
    tabBarLabel='知識膠囊'
    icon={(props) => {
      return (
        <Icon
          source={
            props.focused
              ? TabIconLink.active.knowledgeCapsule
              : TabIconLink.inActive.knowledgeCapsule
          }
        />
      )
    }}
  >
    <Scene
      initial
      key='knowledgeCapsuleList'
      component={KnowledgeCapsule}
      title='知識膠囊'
      titleStyle={Tabstyles.titleStyle}
      navigationBarStyle={Tabstyles.headerStyle}
    />
  </Scene>

)
