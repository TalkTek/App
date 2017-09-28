import {
  StyleSheet,
  Dimensions
} from 'react-native'
import { COLORS } from 'StyleConfig'

const { width: number } = Dimensions.get('window')
const style: Object = {
  container: {
    backgroundColor: COLORS.pureWhite
  },
  mainBackground: {
    backgroundColor: COLORS.pureWhite
  },
  subBackground:{
    backgroundColor: COLORS.white
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
  },
  padding: {
    padding: 30
  },
  marginTop: {
    marginTop: 10
  }
}

export default style
