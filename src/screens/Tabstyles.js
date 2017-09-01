
const Tabstyles = {
  headerStyle: {
    backgroundColor: 'rgb(31, 191, 179)',
    height: 64
  },
  titleStyle: {
    color: 'white',
    fontSize: 17,
    lineHeight: 22
  }
}

const TabIconLink = {
  active: {
    knowledgeCapsule: require('../assets/img/tabIcon/knowledgeCapsule/cap_active.png'),
    memberCenter: require('../assets/img/tabIcon/memberCenter/member_active.png'),
    talkContent: require('../assets/img/tabIcon/lecture/lec_active.png')
  },
  inActive: {
    knowledgeCapsule: require('../assets/img/tabIcon/knowledgeCapsule/cap_inactive.png'),
    memberCenter: require('../assets/img/tabIcon/memberCenter/member_inactive.png'),
    talkContent: require('../assets/img/tabIcon/lecture/lec_inactive.png')
  }
}
export { TabIconLink, Tabstyles }
