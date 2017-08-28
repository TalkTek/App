import React from 'react'
import {Scene} from 'react-native-router-flux'
import MemberCenter from './index'
import MemberInfo from './subscreen/memberInfo'
import FeedBack from './subscreen/feedback'
import Apply from './subscreen/apply'
import Mypoint from './subscreen/myPoint'
import Mycapsule from './subscreen/myCapsule'
import Mytalk from './subscreen/myTalk'
import DownLoad from './subscreen/download'
import PointCenter from './subscreen/pointCenter'
import Icon from '../../components/img/icon/MediumIcon'
import {Tabstyles, TabIconLink} from '../Tabstyles'

export default (
  <Scene
    key='memberCenter'
    tabBarLabel='我的'
    icon={(props) => {
      return (
        <Icon
          source={
              props.focused
                ? TabIconLink.active.memberCenter
                : TabIconLink.inActive.memberCenter
            }
          />
      )
    }}
    titleStyle={Tabstyles.titleStyle}
    navigationBarStyle={Tabstyles.headerStyle}
    >
    <Scene
      initial
      key='memberCenterList'
      component={MemberCenter}
      title='我的'
    />
    <Scene
      key='memberInfo'
      component={MemberInfo}
      back
      title='個人資料'
    />
    <Scene
      key='feedback'
      component={FeedBack}
      back
      backTitle=''
      title='意見反饋'
    />
    <Scene
      key='download'
      component={DownLoad}
      back
      backTitle=''
      title='下載'
    />
    <Scene
      key='apply'
      component={Apply}
      back
      backTitle=''
      title='成為講師'
    />
    <Scene
      key='mypoint'
      component={Mypoint}
      back
      backTitle=''
      title='我的點數'
    />
    <Scene
      key='mycapsule'
      component={Mycapsule}
      back
      backTitle=''
      title='我的膠囊收藏'
    />
    <Scene
      key='mytalk'
      component={Mytalk}
      back
      backTitle=''
      title='我的小講'
    />
    <Scene
      key='pointcenter'
      component={PointCenter}
      back
      backTitle=''
      title='儲值中心'
    />
  </Scene>
)
