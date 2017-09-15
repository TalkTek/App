import React, { Component } from 'react'
import {
  View
} from 'react-native'
import styled from '../../../utils/styledComponent'
import { COLORS } from 'StyleConfig'

const styles = {
  height: 1,
  width: '100%',
  backgroundColor: COLORS.lightGray
}

export default styled(View, styles)
