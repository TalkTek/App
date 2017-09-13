import { createSelector } from 'reselect'

const getMemberState = state => state.member

const getFavoriteCapsule = () => createSelector(
  getMemberState,
  memberState => {
    return memberState.favoriteCapsule
  }
)

export {
  getFavoriteCapsule
}