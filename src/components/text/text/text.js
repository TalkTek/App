import { Text } from 'react-native'
import styled from '../../../utils/styledComponent'
import propTypes from 'prop-types'

const text = styled(Text, (styleProps: {}) => ({
  fontSize: styleProps.fontSize,
  fontWeight: styleProps.fontWeight,
  color: styleProps.color || 'rgb(33, 33, 33)'
}))

text.propTypes = {
  styleProps: propTypes.object
}

export default text
