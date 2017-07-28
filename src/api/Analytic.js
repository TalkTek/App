import { GoogleAnalyticsTracker } from 'react-natvie-google-analytics-bridge'

const GA_DB = 'UA-100475279-1'

export default class Analytic {
  static _Analytic = new GoogleAnalyticsTracker(GA_DB)
  _screen = ''

  setScreen(screen) {
    this._screen = screen;
    _Analytic.trackScreenView(screen)
  }

  track(category, value, otherData) {
    this.setScreen(this._screen)
    _Analytic.trackEvent(category, value, otherData)
  }
}
