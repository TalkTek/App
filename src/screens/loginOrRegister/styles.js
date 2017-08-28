import {
  Dimensions,
  Platform
} from 'react-native'
import { COLORS } from 'StyleConfig'

const { height: screenHeight, width: screenWidth } = Dimensions.get('window')

export const loginStyles = {
  spinningModal: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalErrorMsgText: {
    marginHorizontal: 13
  },
  modalButton: {
    alignSelf: 'auto',
    backgroundColor: COLORS.pureWhite
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    height: screenHeight * 0.2624,
    width: screenWidth * 0.8,
    backgroundColor: 'white',
    borderRadius: 10
  },
  container: {
    backgroundColor: COLORS.pureWhite
  },
  bg: {
    height: screenHeight,
    alignItems: 'center',
    width: '75%',
    alignSelf: 'center'
  },
  logo: {
    marginTop: screenHeight * 0.1,
    width: 80,
    zIndex: 0
  },
  form: {
    borderWidth: 2,
    borderColor: 'rgb(224, 224, 224)',
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 8,
    width: '100%'
  },
  item: {
    height: screenHeight * 0.07,
    marginLeft: 0
  },
  input: {
    height: screenHeight * 0.068,
    width: '100%',
    paddingLeft: 16,
  },
  baseButton: {
    alignSelf: 'auto'
  },
  socialButton: {
    marginBottom: 12
  },
  or: {
    marginVertical: 20,
    lineHeight: 17
  }
}
