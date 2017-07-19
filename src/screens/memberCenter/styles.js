import {
  StyleSheet,
  Dimensions
} from 'react-native'

const { width } = Dimensions.get('window')
console.log(width)
const style = {
  container: {
    backgroundColor: 'rgb(245, 245, 245)'
  },
  mainBackground: {
    backgroundColor: '#fff',
  },
  avatar: {
    minHeight: 165,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 40
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
    marginTop: 16
  },
  listItem: {
    paddingTop: 16,
    paddingBottom: 17,
    flexDirection: 'row',
    alignItems: 'center'
  },
  listIcon: {
    width: 24,
    height: 24,
    marginLeft: 24
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
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
    marginTop: 24,
    borderRadius: 8
  }
}

export default style

const memberInfoStyle = {
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
    marginTop: 16,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  uploadBtnText: {
    backgroundColor: 'transparent',
    fontSize: 15
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
  saveButton: {
    fontSize: 10
  }
}

export { memberInfoStyle }
