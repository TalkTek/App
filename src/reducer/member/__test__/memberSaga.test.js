import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {
  createMemberFlow,
  loginMemberEmailFlow,
  resStatus
} from '../memberSaga'
import MemberAPI from '../memberAPI'


describe('member saga test', () => {
  test('member email login should go throught right flow', () => {
    const userData = {
      email: 'asd',
      password: 'asd',
      avatarUrl: '',
      from: '',
      name: ''
    }

    return expectSaga(loginMemberEmailFlow)
      .provide([
        [matchers.call.fn(MemberAPI.loginMemberEmail), userData]
      ])
      .put({type: 'MEMBER_SUCCESS'})
      .dispatch({
        type: 'LOGIN_MEMBER_EMAIL',
        payload: userData
      })
      .run()
      .then(({ effects }: any) => {
        expect(effects.call.length).toBe(3)
      })
  })

  test('response status should put correct status', () => {
    return expectSaga(resStatus, {code: 'an error code'})
      .put({type: 'MEMBER_FAIL', payload: {code: 'an error code'}})
      .run()
  })

  test('create member flow is correct', () => {
    const createMemberData = {
      email: 'www',
      password: 'www'
    }

    return expectSaga(createMemberFlow)
      .provide([
        [matchers.call.fn(MemberAPI.registerMember), createMemberData]
      ])
      .put({ type: 'MEMBER_SUCCESS' })
      .dispatch({
        type: 'CREATE_MEMBER',
        payload: createMemberData
      })
      .run()
  })
})
