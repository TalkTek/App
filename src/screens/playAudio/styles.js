import { Dimensions } from 'react-native'

const {
  height: screenHeight,
  width: screenWidth
} = Dimensions.get('window')

export default {
  container: {
    backgroundColor: 'white'
  },
  header: {
    backgroundColor: 'white',
    borderBottomWidth: 0
  },
  banner: {
    resizeMode: 'contain',
    height: screenHeight * 0.34,
    width: screenWidth
  },
  body: {
    height: 290,
    paddingHorizontal: screenWidth * 0.085,
    paddingTop: 24,
    alignItems: 'center'
  },
  title: {
    marginBottom: 16
  },
  audioType: {
    marginBottom: 20
  },
  slider: {
    width: screenWidth * 0.83,
    marginBottom: 10
  },
  track: {
    height: 2,
    borderRadius: 2,
    backgroundColor: 'rgb(238, 238, 238)'
  },
  trackThumb: {
    top: 22,
    width: 20,
    height: 20,
    borderRadius: 30 / 2,
    backgroundColor: 'white',
    borderColor: 'rgb(31, 191, 179)',
    borderWidth: 2
  },
  sliderTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  audioFunc: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: screenWidth * 0.915
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgb(224, 224, 224)',
    height: 75,
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  footerFunUnit: {
    alignItems: 'center'
  }
}
