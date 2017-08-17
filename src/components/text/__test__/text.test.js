import React from 'react'
import { shallow } from 'enzyme'
import Text from '../text'

const textProps = {
  fontSize: 12,
  bold: true,
  color: '#000'
}

const textStyle = [
  { fontSize: 12, fontWeight: '700', color: '#000' },
  undefined
]

describe('<Text />', () => {
  it('should render Text Tag', () => {
    const wrapper = shallow(<Text />).dive()
    expect(wrapper.type()).toEqual('Text')
  })

  it('should have correct style', () => {
    const wrapper = shallow(<Text {...textProps} />).dive()
    expect(wrapper.prop('style')).toEqual(textStyle)
  })
  
  it('should have correct text color', () => {
    const wrapper = shallow(<Text gray />).dive()
    expect(wrapper.prop('style')[0].color).toEqual('rgb(158, 158, 158)')
  })
})