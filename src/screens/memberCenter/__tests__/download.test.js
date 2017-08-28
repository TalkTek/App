import React from 'react'
import { shallow } from 'enzyme'
import { Download } from '../subscreen/download'

describe('rendering', () => {
  let wrapper
  let capsules = [{
    active: false,
    parentKey: 'zzzz',
    audioName: 'zzzz',
    length: { formatted: '00:00', sec: '200' },
    url: 'zzzz',
    likeCounter: '1'
  },
  {
    active: false,
    parentKey: 'xxxx',
    audioName: 'xxxx',
    length: { formatted: '00:00', sec: '100' },
    url: 'xxxx',
    likeCounter: '2'
  }]
  beforeEach(() => {
    wrapper = shallow(<Download capsules={capsules} />)
  })
  it('should render 2 TouchableHighlight', () => {
    expect(wrapper.find('TouchableHighlight')).toHaveLength(2)
  })
  // it('should render 2 Text', () => {
  //   expect(wrapper.find('Icon')).toHaveLength(2)
  // })
})
