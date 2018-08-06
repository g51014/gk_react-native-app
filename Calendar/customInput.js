/* @flow */
//自訂input
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import Style from './style';

export default class CustomInput extends Component {
  render() {
    return (
      <View>
        <TextInput
         onEndEditing={event =>{this.props.callback(this.props.id,event.nativeEvent.text)}}
         placeholderTextColor= {this.props.placeholderTextColor}
         style={[Style.font_option,{textAlign:this.props.textAlign,color:this.props.color}]}
         placeholder={this.props.placeholder}
         multiline={this.props.multiline}
         value={this.props.value}/>
      </View>
    );
  }
}

//預設值
  CustomInput.defaultProps ={
  value:'',
  id:null,
  multiline:false,
  placeholder:null,
  placeholderTextColor:'gray',
  color:'#272727',
  textAlign:'center',
  callback:()=>{}
};
