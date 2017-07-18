import {
  StyleSheet,
  Dimensions
} from 'react-native'

export default StyleSheet.create({
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
    paddingRight: 10
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
    borderRadius: 3
  }
})
