import React from 'react'
import { shallow } from 'enzyme'
import Text from './text'

const textStyle = {
  fontSize: 12,
  fontWeight: 'bold',
  color: '#000'
}

describe('<Text />', () => {
  it('should render Text Tag', () => {
    const wrapper = shallow(<Text />).dive()
    expect(wrapper.type()).toEqual('Text')
  })

  it('should have correct style', () => {
    const wrapper = shallow(<Text {...textStyle} />).dive()
    expect(wrapper.props('style').fontSize).toEqual(textStyle.fontSize)
    expect(wrapper.props('style').fontWeight).toEqual(textStyle.fontWeight)
    expect(wrapper.props('style').color).toEqual(textStyle.color)
  })
})