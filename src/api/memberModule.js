import FirebaseDB from './lib/FirebaseDB'

export default class memberModule extends FirebaseDB {
  async writeProfile (uid, memberState) {
    let path = `users/${uid}/profile`
    let profile
    if (await this.exists(path)) {
      profile = await this.getMemberState(uid)
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

  async registerMember (email, password) {
    try {
      let user = await this.auth
        .createUserWithEmailAndPassword(email, password)

      await this.write(`/users/${user.uid}/profile`, {
        name: user.displayName,
        email: user.email,
        avatarUrl: user.photoURL
      })
      return user
    } catch (e) {
      return e
    }
  }

  async loginMemberEmail (email, password) {
    try {
      let user = await this.auth.signInWithEmailAndPassword(email, password)
      return user
    } catch (e) {
      return e
    }
  }

  getMemberState (uid) {
    return this.readOnce(`/users/${uid}/profile`)
  }

  async sendResetPasswordEmail (email) {
    try {
      return await this.auth.sendPasswordResetEmail(email)
    } catch (e) {
      return e
    }
  }
}
