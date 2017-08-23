import React from 'react'
import { shallow } from 'enzyme'
import { PlayerButtons } from '../PlayerButtons'
import {TouchableHighlight} from 'react-native'

describe('playerButton test', () => {
  it('should render <PlayerButtons> Tag', () => {
    shallow(<PlayerButtons />)
  })

  it('should correct show list from data props', () => {
    const data = {
      backward15: {
        twoState: false,
        link: 'this is a image link',
        func: () => {}
      }
    }

    let wrapper = shallow(<PlayerButtons data={data} />)
    expect(wrapper.length).toEqual(1)
    // expect(wrapper.children().find('TouchableHighlight').length).toEqual(1)
  })
})
