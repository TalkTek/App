import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge'

const GA_DB = 'UA-100475279-1'

export default class Analytic {
  _Analytic = new GoogleAnalyticsTracker(GA_DB)
  _screen = ''

  setScreen(screen) {
    this._screen = screen;
    this._Analytic.trackScreenView(screen)
  }

  track(category, value, otherData) {
    this.setScreen(this._screen)
    this._Analytic.trackEventWithCustomDimensionValues(category, value, {}, otherData)
  }
}
