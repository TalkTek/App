// @flow
'use strict'

import React, { Component } from 'react'
import { 
  View,
  Text,
  TouchableOpacity,
  Button,
  DatePickerIOS
} from 'react-native'
import {
  Thumbnail,
  Input,
  Content,
  Container,
  Picker
} from 'native-base'
import { memberInfoStyle } from './styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import memberAction from '../../reducer/member/memberAction'
import analyticAction from '../../reducer/analytic/analyticAction'

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
  memberFrom: state.member.from,
  memberGender: state.member.gender,
  memberBirthday: state.member.birthday
}), (dispatch) => ({
  ga: bindActionCreators(analyticAction, dispatch)
}))

class MemberInfo extends Component {
  formData = {
    email: { text: '帳號', readOnly: true },
    password: { text: '設定密碼', notFromSocial: true },
    name: { text: '名稱' },
    gender: { text: '性別' },
    birthday: { text: '生日' }
  }

  state = {
    genderValue: 'unknow',
    birthday: new Date()
  }

  static navigationOptions = (navigation) => ({
    headerRight: <HeaderRight navigation={navigation.navigation} />
  })

  componentWillMount() {
    state['email'] = this.props.memberEmail
    state['name'] = this.props.memberName
    state['gender'] = this.props.memberGender || 'unknow'
    state['birthday'] = this.props.memberBirthday
    this.setState({
      birthday: this.props.memberBirthday || new Date(),
      genderValue: this.props.memberGender || 'unknow'
    })
    this.props.ga.gaSetScreen('MemberInfo')
  }

  _renderFormElement(key, data) {
    const Item = Picker.Item
    let value = this.props[`member${key.charAt(0).toUpperCase()}${key.slice(1)}`]
    switch(key) {
      case 'gender': 
          return (
            <Picker mode="dropdown" iosHeader="請選擇" 
              selectedValue={this.state.genderValue}
              color={memberInfoStyle.textInput.color}
              onValueChange={(data) => {
                this.setState({ genderValue: data })
                state['gender'] = data
              }}
            >
              <Item label="男" value="man" />
              <Item label="女" value="woman" />
              <Item label="不公開" value="unknow" />
            </Picker>
          )
        break
      case 'birthday': 
        return (
          <DatePickerIOS mode="date" date={new Date(this.state.birthday)} 
            onDateChange={(data) => {
              state['birthday'] = data.toDateString()
              this.setState({ birthday: data })
            }}
            style={memberInfoStyle.inputArea}
          />
        )
        break
      default:
        return (
          <View style={memberInfoStyle.inputArea}>
            <Input 
              style={memberInfoStyle.textInput} 
              defaultValue={value} 
              editable={!data.readOnly} 
              onChangeText={(text) => {
                state[key] = text
              }}
            />
          </View>
        )
    }
  }

  _renderFormComponent(key) {
    let data = this.formData[key]

    if (!data.notFromSocial)
    return (
      <View key={key} style={memberInfoStyle.formInput}>
        <View style={memberInfoStyle.input}>
          <Text style={memberInfoStyle.inputLabel}>{data.text}</Text>
        </View>
       { this._renderFormElement(key, data) }
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
