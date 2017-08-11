// @flow
import { Player } from 'react-native-audio-toolkit'

let player = null
export default class PlayerControl {

  static async _init (url) {
    if (player) {
      await this._destroy(player)
    }
    return new Promise((resolve, reject) => {
        player = new Player(url, {
          autoDestory: false,
          continuesToPlayInBackground: true
        }).prepare(resolve)
      })
  }

  static _destroy (player) {
    return new Promise((resolve, reject) => {
      player.destroy(resolve)
    })
  }

  static play () {
    player? player.play(): null
  }

  static pause () {
    player? player.pause(): null
  }

  static playPause () {
    return new Promise((resolve, reject) => {
      player? player.playPause(resolve): null
    })
  }

  static seek (position: number) {
    return new Promise((resolve, reject) => {
      player? player.seek(position, resolve): null
    })
  }

  static wakeLock(isWake: boolean) {
    player.wakeLock = isWake
  }

  static get currentTime():?number {
    return player.currentTime
  }

  static async load (url: string) {
    return await this._init(url)
  }
}