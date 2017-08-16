import React from 'react'
import { shallow } from 'enzyme'

import FullWidthBanner from './fullWidthBanner'

describe('<fullWidthBanner />', () => {
  it('should render an <Image> tag', () => {
    const wrapper = shallow(<FullWidthBanner />).dive()
    expect(wrapper.type()).toEqual('Image')
  })
})