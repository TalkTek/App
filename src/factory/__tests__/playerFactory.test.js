import React from 'react'
import PlayerFactory from '../playerFactory'

describe('PlayerFactory', () => {
  it('should be only one instance in whole project', () => {
    let obj1 = PlayerFactory
    let obj2 = PlayerFactory
    expect(obj1).toBe(obj2)
  })
  describe('should init function work correctly', () => {
    it('should have local variable called player and its init value is undefined', () => {
      expect(PlayerFactory).toHaveProperty('Player', undefined)
    })
    it('should isPlayerExisted return true if player is newed by constructor', () => {
      let player = {}
      expect(PlayerFactory.isPlayerExisted(player)).toBeTruthy()
    })
    it('should isPlayerExisted return false if player is undefined', () => {
      let player = undefined
      expect(PlayerFactory.isPlayerExisted(player)).toBeFalsy()
    })
    it('should createPlayer return instance', () => {
      let url = 'test'
      let isInstanceExisted
      PlayerFactory.createPlayer(url)
      isInstanceExisted = typeof PlayerFactory.player === 'object'
      expect(isInstanceExisted).toBeTruthy()
    })
    it('the path of instance of Player should be the url that we pass into createPlayer', () => {
      let url = 'test'
      PlayerFactory.createPlayer(url)
      expect(PlayerFactory.player._path).toEqual(url)
    })
    it('the prop of autoDestroy of instance of Player should be false', () => {
      let url = 'test'
      PlayerFactory.createPlayer(url)
      expect(PlayerFactory.player._options.autoDestroy).toBeFalsy()
    })
  })

})
