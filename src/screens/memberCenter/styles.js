import {
  StyleSheet,
  Dimensions
} from 'react-native'

const { width: number } = Dimensions.get('window')
const style: Object = {
  container: {
    backgroundColor: 'rgb(245, 245, 245)'
  },
  mainBackground: {
    backgroundColor: '#fff'
  },
  avatar: {
    minHeight: 165,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  moreInfo: {
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 16
  },
  email: {
    marginTop: 16
  },
  selectList: {
    marginTop: 16,
  },
  listItem: {
    paddingTop: 16,
    paddingBottom: 17,
    flexDirection: 'row',
    alignItems: 'center'
  },
  listText: {
    marginLeft: 13
  },
  listRightText: {
    flex: 1,
    color: '#1fbfb3',
    textAlign: 'right'
  },
  listItemLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15
  },
  listItemMore: {
    width: 32,
    right: 16,
    alignItems: 'center'
  },
  logout: {
    borderColor: 'rgb(158, 158, 158)',
    borderWidth: 1,
    marginTop: 24,
    height: 40,
    marginHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default style

const memberInfoStyle: Object = {
  container: style.container,
  avatar: { 
    ...style.avatar, 
    backgroundColor: 'rgb(250, 250, 250)'
  },
  avatarImg: style.avatarImg,
  uploadBtn: {
    borderColor: 'rgb(97, 97, 97)',
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: 'solid',
    marginTop: 16
  },
  uploadBtnText: {
    backgroundColor: 'transparent',
    fontSize: 15,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10
  },
  form: {
    ...style.mainBackground,
    marginTop: 16,
    width: '120%' // this is a bug, but don't know why
  },
  formInput: {
    paddingTop: 2,
    paddingBottom: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    borderStyle: 'solid',
    borderColor: 'rgb(250, 250, 250)',
    borderBottomWidth: 1
  },
  input: {
    flex: 2,
    minWidth: 100
  },
  inputLabel: {
    paddingLeft: 24
  },
  inputArea: {
    flex: 8
  },
  textInput: {
    color: 'rgb(31, 191, 179)'
  },
  dateSelect: {
    paddingTop: 15,
    paddingLeft: 5,
    paddingBottom: 15,
    paddingRight: 5
  },
  saveButton: {
    fontSize: 10
  }
}

const myTalkStyle: Object = {
  container: {
    backgroundColor: 'rgb(250, 250, 250)',
  },
  card: {
    flexDirection: 'column',
    marginLeft: 24,
    marginRight: 24,
    marginTop: 16,
    marginBottom: 16,
    borderColor: 'rgb(245, 245, 245)',
    borderStyle: 'solid',
    borderBottomWidth: 1
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  author: {
    marginLeft: 16,
    fontSize: 12
  },
  contentWrapper: {
    flexDirection: 'row'
  },
  content: {
    paddingTop: 4,
    paddingBottom: 4,
    fontSize: 13,
    flex: 9
  },
  date: {
    color: 'rgb(158, 158, 158)',
    fontSize: 13
  },
  cost: {
    flex: 1,
    color: 'rgb(31, 191, 179)'
  }
}

const myPointStyle: Object = {
  container: {
    ...myTalkStyle.container,
    paddingTop: 16,
    paddingBottom: 4,
    paddingLeft: 24,
    paddingRight: 24,
    fontSize: 13
  },
  pointList: {
    backgroundColor: '#fff',
    paddingLeft: 24,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
  },
  coin: {
    width: 24,
    height: 24,
    flex: 1
  },
  pointText: {
    flex: 3,
    paddingLeft: 13,
    color: 'rgb(31, 191, 179)'
  },
  term: {
    flex: 3
  },
  enterIcon: {
    flex: 0
  }
}

const pointCenterStyle: Object = {
  container: style.container,
  nowPoint: {
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  myPointText: {
    color: 'rgb(33, 33, 33)',
    textAlign: 'center',
  },
  selector: {
    ...myTalkStyle.container,
    borderColor: 'rgb(224, 224, 224)',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 8,
    justifyContent: 'center'
  },
  pointCostWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16
  },
  buyPointText: {
    color: 'rgb(31, 191, 179)',
    marginRight: 10
  },
  otherText: {
    marginTop: 16,
    color: 'rgb(158, 158, 158)'
  },
  smallText: {
    fontSize: 13
  },
  bigText: {
    fontSize: 18
  },
  textCenter: {
    textAlign: 'center'
  },
  paymentBtn: {
    backgroundColor: 'rgb(31, 191, 179)',
    marginLeft: 16,
    marginRight: 16,
    marginTop: 24,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 8
  },
  btnColor: {
    color: '#fff'
  },
  selected: {
    borderColor: 'rgb(31, 191, 179)',
    borderWidth: 2,
    marginBottom: 7
  }
}

const feedBackStyle: Object = {
  content: {
    ...myTalkStyle.container,
    paddingLeft: 16,
    paddingRight: 16
  },
  textLabel: {
    marginTop: 16,
    paddingLeft: 8,
    paddingRight: 8,
    color: 'rgb(158, 158, 158)'
  },
  indicator: {
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    backgroundColor: '#fff',
    borderColor: 'rgb(224, 224, 224)',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 4
  },
  mutiInput: {
    minHeight: 96
  },
  sendBtn: {
    ...pointCenterStyle.paymentBtn,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 24
  },
  sendText: {
    color: '#fff'
  }
}

const applyStyle = {
  welcomeJoin: {
    ...myTalkStyle.container,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80
  }
}

export {
  memberInfoStyle,
  myTalkStyle,
  myPointStyle,
  pointCenterStyle,
  feedBackStyle,
  applyStyle
}
