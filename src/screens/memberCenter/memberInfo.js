// @flow
'use strict'

import React, { Component } from 'react'
import { 
  View,
  Text,
  TouchableOpacity,
  Button
} from 'react-native'
import {
  Thumbnail,
  Input,
  Content,
  Container
} from 'native-base'
import { memberInfoStyle } from './styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import memberAction from '../../reducer/member/memberAction'

let state = {
  email: '',
  password: null,
  name: '',
  gender: '',
  birthday: ''
}

@connect(state => ({
  memberName: state.member.name,
  memberEmail: state.member.email,
  memberPhoto: state.member.avatarUrl,
  memberFrom: state.member.from
}))

class MemberInfo extends Component {
  formData = {
    email: { text: '帳號', readOnly: true },
    password: { text: '設定密碼', notFromSocial: true },
    name: { text: '名稱' },
    gender: { text: '性別' },
    birthday: { text: '生日' }
  }

  static navigationOptions = (navigation) => ({
    headerRight: <HeaderRight navigation={navigation.navigation} />
  })

  componentWillMount() {
    state['email'] = this.props.memberEmail
    state['name'] = this.props.memberName
  }

  _renderFormComponent(key) {
    let data = this.formData[key]
    console.log(`member${key.charAt(0).toUpperCase()}${key.slice(1)}`)
    let value = this.props[`member${key.charAt(0).toUpperCase()}${key.slice(1)}`]
    if (!data.notFromSocial)
    return (
      <View key={key} style={memberInfoStyle.formInput}>
        <View style={memberInfoStyle.input}>
          <Text style={memberInfoStyle.inputLabel}>{data.text}</Text>
        </View>
        <View style={memberInfoStyle.inputArea}>
          <Input 
            style={memberInfoStyle.textInput} 
            defaultValue={state[key]} 
            editable={!data.readOnly} 
            onChangeText={(text) => {
              state[key] = text
            }}
          />
        </View>
      </View>
    )
  }

  render() {
    return (
      <Container style={memberInfoStyle.container}>
        <Content>
          <View style={memberInfoStyle.avatar}>
            <Thumbnail 
              source={{
                uri: this.props.memberPhoto
              }}
              style={memberInfoStyle.avatarImg}
            />
            <TouchableOpacity
              style={memberInfoStyle.uploadBtn}
            >
              <Text style={memberInfoStyle.uploadBtnText}>
                上傳照片
              </Text>
            </TouchableOpacity>
          </View>
          <View style={memberInfoStyle.form}>
            {
              Object.keys(this.formData)
                .map(this._renderFormComponent.bind(this))
            }
          </View>
        </Content>
      </Container>
    )
  }
}

@connect( state => {
  return {
    memberUid: state.member.uid
  }
}, dispatch => {
  return {
    action: bindActionCreators(memberAction.saveMemberChange, dispatch)
  }
})

class HeaderRight extends Component {
  render() {
    console.log(this.props)
    return (
      <Button 
        title="儲存"
        color="#fff"
        onPress={() => {
          this.props.action({
            memberUid: this.props.memberUid,
            post: state
          })
           this.props.navigation.goBack() 
        }}
        />
    )
  }
}

export { MemberInfo as default, HeaderRight }
