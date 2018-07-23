/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import DatePicker from 'react-native-datepicker';

export default class DatePickTools extends Component {
  constructor(props){
   super(props)
   var currentDate = this.GetDate(0);
   //最遠選到前十天
   var minDate = this.GetDate(10);
   var date = this.props.date;
   // console.warn(minDate);
   this.state = {date:currentDate,minDate:minDate,color:'gray'}
 }
  GetDate(range){
    var date = new Date();
    date.setDate(date.getDate()-range);
    var year = date.getFullYear();
    var month = (date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1);
    var day = date.getDate()<10?'0'+date.getDate():date.getDate();
    return (year + '-' + month + '-' + day);
  }

  render() {
    var styles = {
      dateIcon:{display:'none'},
      dateInput:{
        marginLeft:0,
        borderWidth:0,
        paddingRight:80
      },
      dateText:{
        color:this.state.color,
        fontSize:20,
      }
    }
    return (
      <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate={this.state.minDate}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={styles}
        onDateChange={(date) => {
          this.setState({date: date}),
          this.setState({color:'black'}),
          this.props.callback(date)
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
