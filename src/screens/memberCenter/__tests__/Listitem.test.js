import React from 'react'
import { shallow } from 'enzyme'
import Lisititem from '../Listitem'

describe('rendering', () => {
  let wrapper
  let 
  beforeEach(() => {
    wrapper = shallow(<Download capsules={capsules} />)
  })
  it('should render 2 TouchableHighlight', () => {
    expect(wrapper.find('TouchableHighlight')).toHaveLength(2)
  })
  it('should render 2 Text', () => {
    expect(wrapper.find('Icon')).toHaveLength(2)
  })
})
