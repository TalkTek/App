import FirebaseDB from '../../api/Firebase'

class MemberAPI extends FirebaseDB {
  setFavoriteCapsule = (memberUid, capsuleId, parentKey) => {
    let path = `users/${memberUid}/favorite/${capsuleId}/`
    this.write(path, {
      parentKey
    })
  }

  removeFavoriteCapsule = (memberUid, capsuleId) => {
    let path = `users/${memberUid}/favorite/${capsuleId}`
    this.remove(path)
  }

  async changeMemberProfile (uid, memberData) {
    let path = `users/${uid}/profile`
    let profile = await this.readOnce(path) || {}

    this.update(path, Object.assign(profile, memberData))
  }

  async sendFeedBack (type, content, userId) {
    let path = `feedback/${type}`
    try {
      return await this.push(path, {
        content,
        userId
      })
    } catch (e) {
      return e
    }
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

  async getMemberInfo (uid) {
    try {
      return await this.readOnce(`/users/${uid}/`)
    } catch (e) {
      return e
    }
  }

  async sendResetPasswordEmail (email) {
    try {
      return await this.auth.sendPasswordResetEmail(email)
    } catch (e) {
      return e
    }
  }
}

const memberAPI = new MemberAPI()

export default memberAPI
