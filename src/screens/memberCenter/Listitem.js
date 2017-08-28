'use strict'

import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'


const styles = {
  mainBackground: {
    backgroundColor: '#fff'
  },  
  listItem: {
    paddingTop: 16,
    paddingBottom: 17,
    flexDirection: 'row',
    alignItems: 'center'
  },
  listIcon: {
    width: 24,
    height: 24,
    marginLeft: 24
  },
  listText: {
    marginLeft: 13
  },
  listRightText: {
    flex: 1,
    color: '#1fbfb3',
    textAlign: 'right'
  },
  listItemLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15
  },
  listItemMore: {
    width: 32,
    right: 16,
    alignItems: 'center'
  },
  selectList: {
    marginTop: 16,
  }
}

export default class Listitem extends Component {
    _renderListItem = (rowData: Object) => {
        console.log('rowData is', rowData)
        return (
          <TouchableOpacity
            key={rowData.key}
            onPress={() => rowData.func()}
            style={[styles.mainBackground, styles.listItem]}
          >
            <View style={styles.listItemLeft}>
              <Image
                source={rowData.icon}
                style={styles.listIcon}
              />
              <Text style={styles.listText}>
                {rowData.text}
              </Text>
              {
                rowData.rightText &&
                <Text style={styles.listRightText}>
                  {rowData.rightText}
                </Text>
              }
            </View>
            <View style={styles.listItemMore}>
              <Image
                source={require('../../assets/img/memberCenter/enter.png')}
              />
            </View>
          </TouchableOpacity>
        )
      }
  render () {
    return (
      <View style={styles.selectList}>
        {this.props.listsData.my.map(this._renderListItem)}
        {this.props.listsData.coin.map(this._renderListItem)}
        {this.props.listsData.other.map(this._renderListItem)}
      </View>)
  }
}
