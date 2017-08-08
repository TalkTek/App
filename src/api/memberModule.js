import FirebaseDB from './lib/FirebaseDB'

export default class memberModule extends FirebaseDB {
  async writeProfile (uid, memberState) {
    let path = `users/${uid}/profile`
    let profile
    if (await this.exists(path)) {
      profile = await this.readOnce(path)
    } else {
      profile = {}
    }

    this.write(path, Object.assign(profile, memberState))
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

  async sendFeedBack (type, content, userId) {
    let path = `feedback/${type}`
    await this.push(path, {
      content,
      userId
    })
  }

  logoutMember () {
    return this.auth.signOut()
  }
}
