import styled from '../../utils/styledComponent'
import DefaultButoton from './defaultButton'
import { COLORS } from 'StyleConfig'

const Button = styled(DefaultButoton, (styleProps: {}) => {
  // console.log(styleProps)
  let borderStyle = styleProps.border? {
    borderColor: COLORS.gray,
    borderWidth: Number(styleProps.border)
  }: {}
  return {
    borderColor: styleProps.borderColor,
    borderRadius: styleProps.borderRadius,
    backgroundColor: styleProps.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    width: styleProps.fullWidth? '100%': undefined,
    padding: styleProps.padding,
    ...borderStyle
  }
})

export { Button }
