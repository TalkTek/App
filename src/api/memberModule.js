import FirebaseDB from './FirebaseDB'

export default class memberModule extends FirebaseDB {
  async changeProfile (memberState) {
    let path = `users/${memberState.memberUid}/profile`
    let profile = await this.readOnce(path)

    this.update(path, Object.assign(profile, memberState.post))
  }

  async getLikeCapsule (uid) {
    let path = `users/${uid}/favorite`
    let data = await this.readOnce(path)
    let capsules = []

    if (data) {
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          let { parentKey } = data[key]
          let tmp = await this.readOnce(`capsules/${parentKey}/audios/${key}`)
          tmp.author = tmp.audioName
          capsules.push(tmp)
        }
      }
      return capsules
    }
  }

  async changeMemberProfile (uid, memberData) {
    let path = `users/${uid}/profile`
    let profile = await this.readOnce(path)

    this.update(path, Object.assign(profile, memberData))
  }
}
