import React from 'react'
import { shallow } from 'enzyme'
import XSmallIcon from '../XSmallIcon'

// fake property
const source = require('../../../../assets/img/bubu.png')
const marginLeft = 30
const style = [{
  width: 20,
  height: 20,
  marginLeft: 30,
  marginRight: 0,
  marginBottom: 0,
  marginTop: 0
}, undefined]

const renderComponent = () => shallow(
  <XSmallIcon
    source={source}
    marginLeft={marginLeft}
  />
).dive()

describe('<XSmallIcon />', () => {
  it('should render an <Image> tag', () => {
    const wrapper = renderComponent()
    expect(wrapper.type()).toEqual('Image')
  })
  it('should have an source props', () => {
    const wrapper = renderComponent()
    expect(wrapper.prop('source')).toEqual(source)
  })
  it('should have an change on marginLeft prop if we pass marginLeft value', () => {
    const wrapper = renderComponent()
    expect(wrapper.prop('marginLeft')).toEqual(marginLeft)
  })
  it('should have an correct original styles', () => {
    const wrapper = renderComponent()
    expect(wrapper.prop('style')).toEqual(style)
  })
})
