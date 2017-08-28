/**
 * @providesModule StyleConfig
 * @flow
 */

 /**
  * Environment Colors
  */
const MAIN_COLORS = {
  gray: 'rgb(158, 158, 158)',
  green: 'rgb(31, 191, 179)',
  white: 'rgb(250, 250, 250)',
  black: 'rgb(33, 33, 33)',
  pureWhite: 'white'
}

const AUDIO_COLOR = {
  borderTop: 'rgb(224, 224, 224)',
  trackBarBackground: 'rgb(238, 238, 238)'
}

const SOCIAL_BUTTON = {
  fbButton: 'rgb(58, 88, 151)',
  googleButton: 'rgb(221, 77, 64)'
}

const COLORS = {
  ...MAIN_COLORS,
  ...AUDIO_COLOR,
  ...SOCIAL_BUTTON
}

/**
 * Layout
 */

 const LAYOUT = {
   horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
   },
   vertical: {
     flexDirection: 'column'
   }
 }

export {
  COLORS,
  LAYOUT
}
