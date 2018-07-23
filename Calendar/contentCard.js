/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import Style from './style';

export default class ContentCard extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View style={[Style.setArea,Style.row]}>
        <Text style={[Style.font_option,{flex:1}]}>{this.props.title}：</Text>
        <TextInput editable = {this.props.edit} value = {this.props.value} onEndEditing={event => {this.props.callback(this.props.title,event.nativeEvent.text);}} style={{fontSize:20,flex:1}} placeholder={this.props.placeholder} placeholderTextColor={'gray'}/>
      </View>
    );
  }
}
