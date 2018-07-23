/* @flow weak */

import React from 'react';
import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  column:{
    flexDirection:'column',
  },
  row:{
    flexDirection:'row',
  },
  icon:{
    width:30,
    flexDirection:'row',
    backgroundColor:'#eee',
  },
  botton:{
    flex:1
  },
  remind:{
    width:80,
    flexDirection:'row',
    textAlign: 'left',
    borderColor: '#bbb',
    paddingTop: 17,
    paddingLeft:5,
    backgroundColor: '#eee',
    borderBottomWidth:1,
  },
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 320
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee',
    fontSize:18,
    // fontWeight:'bold',
    color:'#4f4f4f',

  },
  date:{
    paddingTop:15,
    flex:3
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  view_border:{
    borderWidth:1,
    borderColor:'red'
  },
  font_option:{
    fontSize:20,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:5
  },
  setArea:{
    marginLeft:20,marginRight:20,borderWidth:1
  },
  footer:{
    padding:10,
    justifyContent:'center',
    marginTop:30,
  }
});

export default styles;
