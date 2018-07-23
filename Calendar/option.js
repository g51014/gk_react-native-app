/* @flow */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Style from './style';

export default class OptionMenu extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected:[],
      option:{
        title:['盤點','退貨','轉貨','簽約','寄單','收款','提報','陳列','轉銷','活動','教學','其他'],
        color:['gray','gray','gray','gray','gray','gray','gray','gray','gray','gray','gray','gray']
      }};
  }

  EnableOption(optionId)
  {
    var color = this.state.option.color;
    var optionColor = this.state.option.color[optionId];
    var optionTitle = this.state.option.title[optionId];
    if(optionColor == 'gray')
    {
      if(optionId == 0 || optionId == 1 || optionId == 2)
      {
        color[optionId] = '#d94600';
      }
      else if (optionId == 3 || optionId==4||optionId==5) {
        color[optionId] = '#01b468';
      }
      else if (optionId == 6 || optionId==7 || optionId==8 || optionId==9 || optionId==10 ) {
        color[optionId] = '#5599FF';
      }
      else {
        color[optionId] = '#CC6600';
      }
      this.setState({color:color});
    }
    this.props.callback(optionTitle,'enable');
  }

  DisableOption(optionId)
  {
    var color = this.state.option.color;
    var optionTitle = this.state.option.title[optionId];
    color[optionId] = 'gray';
    this.setState({color:color});
    this.props.callback(optionTitle,'disable');
  }

  render() {
    var cards =[];
    var select = [];
    for(var i=0;i<this.state.option.title.length;i++)
    {
      cards.push(<Text onLongPress={this.DisableOption.bind(this,i)} onPress={this.EnableOption.bind(this,i)} style={{textAlign:'center',
      fontSize:18,
      padding:10,
      backgroundColor:'black',
      color:'white',
      borderWidth:1,
      borderColor:'black',
      backgroundColor:this.state.option.color[i],
      opacity:0.7,
      marginBottom:10}}>{this.state.option.title[i]}</Text>)
    }
    // console.warn(cards[0].props);
    return (
      <View style={[,Style.row,{justifyContent:'center',marginTop:10}]}>
        <View style={[,Style.column,{marginRight:10}]}>
          {cards[0]}
          {cards[1]}
          {cards[2]}
        </View>
        <View style={[,Style.column,{marginRight:10}]}>
          {cards[3]}
          {cards[4]}
          {cards[5]}
        </View>
        <View style={[,Style.column,{marginRight:10}]}>
          {cards[6]}
          {cards[7]}
          {cards[8]}
        </View>
        <View style={[,Style.column,{marginRight:10}]}>
          {cards[9]}
          {cards[10]}
        </View>
        <View style={[,Style.column]}>
          {cards[11]}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  optionText:{
    textAlign:'center',
    fontSize:18,
    padding:10,
    backgroundColor:'black',
    color:'white'
  },
  orange:{
    borderWidth:1,
    borderColor:'black',
    backgroundColor:'#CC6600',
    opacity:0.7
  },
  red:{
    borderWidth:1,
    borderColor:'black',
    backgroundColor:'#d94600',
    opacity:0.7
  },
  green:{
    borderWidth:1,
    borderColor:'black',
    backgroundColor:'#01b468',
    opacity:0.7
  },
  blue:{
    borderWidth:1,
    borderColor:'black',
    backgroundColor:'#5599FF',
    opacity:0.7
  }
});
