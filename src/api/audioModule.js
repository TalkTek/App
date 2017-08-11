import FirebaseDB from './lib/FirebaseDB'

export default class AudioModule extends FirebaseDB {
  async cpAudioGood (capsulesId, parentKey, userId, counter) {
    let audio, path = `capsules/${parentKey}/audios/${capsulesId}`
    this.write(
      `users/${userId}/favorite/${capsulesId}`,
      {parentKey}
    )
    audio = await this.readOnce(path)

    audio.likeCounter = counter

    this.update(path, audio)
    return audio.likeCounter
  }

  async cpAudioNotGood (capsulesId, parentKey, userId, counter) {
    let audio, path = `capsules/${parentKey}/audios/${capsulesId}`
    this.remove(`users/${userId}/favorite/${capsulesId}`)

    audio = await this.readOnce(path)

    audio.likeCounter = counter

    this.update(path, audio)
    return audio.likeCounter
  }

  getAudioInfo (capsulesId, parentKey) {
    let path = `capsules/${parentKey}/audios/${capsulesId}`
    return this.readOnce(path)
  }

  async checkAudioIsLiked (capsuleId, memberUid) {
    let isLiked =
      await this.exists(`users/${memberUid}/favorite/${capsuleId}`)

    return isLiked
  }

  async getAudioDoc (capsuleId, parentKey) {
    // console.log(`capsules/${parentKey}/audios/${capsuleId}/draft`)
    let draft = await this.readOnce(`capsules/${parentKey}/audios/${capsuleId}/draft`)

    return draft
  }
}
