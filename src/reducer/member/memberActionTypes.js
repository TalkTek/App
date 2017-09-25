// @flow 

type UserType = { avatarUrl: string|null, email: string, from: string, uid: string }

export type ActionType = 
    { type: 'GET_MEMBER_STATE', payload: { uid: string } }
  | { type: 'CHANGE_MEMBER_STATE', payload: UserType }
  | { type: 'LOGOUT_MEMBER' }
  | { type: 'LOGIN_MEMBER', payload: { post: UserType } }
  | { type: 'LOGIN_MEMBER_EMAIL', payload: { email: string, password: string } }
  | { type: 'CREATE_MEMBER' }
  | { type: 'MEMBER_FAIL', payload: { code: string, message: string } }
  | { type: 'MEMBER_SUCCESS' }
  | { type: 'SAVE_MEMBER_CHANGE', payload: { memberUid: string, post: { email?: string, birdthday? string, gender?: string, name?: string  }} }
  | { type: 'MEMBER_CAPSULE_GET', payload: {} }
  | { type: 'MEMBER_CAPSULE_GET_SUCCESS', payload: {} }
  | { type: 'SEND_FEEDBACK', payload: { content: string, type: string, userId: string } }
  | { type: 'SEND_FEEDBACK_SUCCESS' }
  | { type: 'SEND_RESET_PASSWORD_EMAIL', payload: string }
