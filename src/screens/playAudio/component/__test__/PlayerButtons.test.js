import React from 'react'
import { shallow } from 'enzyme'
import { PlayerButtons } from '../PlayerButtons'
import {TouchableHighlight} from 'react-native'
import renderer from 'react-test-renderer'

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
    const element = <PlayerButtons data={data} />
    const tree = renderer.create(element)
    const wrapper = shallow(element)
    expect(wrapper.length).toEqual(1)
    expect(tree).toMatchSnapshot()
    // expect(wrapper.children().find('TouchableHighlight').length).toEqual(1)
  })
})
