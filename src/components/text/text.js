import { Text } from 'react-native'
import styled from '../../utils/styledComponent'
import propTypes from 'prop-types'
import { COLORS } from 'StyleConfig'

const colors = {
  gray: 'rgb(158, 158, 158)',
  green: 'rgb(31, 191, 179)',
  white: 'rgb(250, 250, 250)',
  black: 'rgb(33, 33, 33)'
}

const text = styled(Text, (styleProps: {}) => {
  let color
  Object.keys(styleProps).forEach((ele) => {
    if (COLORS[ele] && styleProps[ele]) {
      color = COLORS[ele]
    }
  })

  return {
    fontSize: styleProps.fontSize,
    fontWeight: styleProps.bold? '700': null,
    color: styleProps.color || color || 'rgb(33, 33, 33)'
  }
})

text.propTypes = {
  styleProps: propTypes.object
}

export default text
