import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge'

let GA_DB

if(__DEV__) {
  GA_DB = 'UA-104998542-1'
} else {
  GA_DB = 'UA-100475279-1'
}

export default class Analytic {
  _Analytic = new GoogleAnalyticsTracker(GA_DB)
  _screen = ''

  setScreen(screen) {
    this._screen = screen;
    this._Analytic.trackScreenView(screen)
  }

  track(category, value, otherData) {
    this.setScreen(this._screen)
    this._Analytic.trackEvent(category, value, otherData)
  }
}
