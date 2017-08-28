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
  subBackground:{
    backgroundColor: 'rgb(250, 250, 250)'
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
  logout: {
    marginTop: 24,
    height: 40,
    marginHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  paymentBtn: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 24,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 8
  }
}

export default style