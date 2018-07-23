/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import { SearchBar } from 'react-native-elements';
import DropdownMenu from 'react-native-dropdown-menu';
import { Dropdown } from 'react-native-material-dropdown';
import Style from './style';

export default class MyComponent extends Component {

  constructor(props) {
    super(props);
    this.GetCustomerList();
    this.Search = this.Search.bind(this);
    this.SetKey = this.SetKey.bind(this);
    this.state = {
      info:{name:[],address:[],phone:[],lastDate:[],amount:[],lastAmount:[],color:[]},
      name:[],
      color:[],
      key:{type:'所有'}
    };
  }

  GetCustomerList()
  {
    var info;
    var name=[],address=[],phone=[],lastDate=[],amount=[],lastAmount=[],color=[],type=[];
    var url = 'http://localhost:8081/Calendar/data/MapIfno.js';
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        for(var i=0;i<response.length;i++)
        {
          name.push(response[i].name);
          address.push(response[i].address);
          phone.push(response[i].telephone1);
          lastDate.push(response[i].lastDate);
          amount.push(response[i].amount);
          lastAmount.push(response[i].lastAmount);
          if(response[i].Type == 'account')
          {
            color.push('#01814a');
            type.push('顧客');
          }
          else
          {
            type.push('淺客');
            color.push('#01b468');
          }

        }
        info = {name:name,address:address,phone:phone,lastDate:lastDate,amount:amount,lastAmount:lastAmount,color:color,type:type};
        this.setState({info:info,name:info.name,color:info.color});
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  //更新排列條件
  SetKey(value)
  {
    var key = this.state.key;
    if(value == '顧客' || value == '淺客'||value=='所有')
    {
      key.type = value;
    }
    else
    {
      key.sort = value;
    }
    this.setState({key:key});
    this.Sort();
  }

  //排列
  Sort()
  {
    var type = this.state.key.type;
    var sort = this.state.key.sort;
    var index = [];
    //type篩選
    if( type != '所有')
    {
      for(var i=0;i<this.state.info.type.length;i++)
      {
        var num = this.state.info.type.indexOf(this.state.key.type,i);
        if(!index.includes(num) && num != -1)index.push(num);
      }
      var name = [];
      var color = [];
      for(var i=0;i<index.length;i++)
      {
        name.push(this.state.info.name[index[i]]);
        if(type == '顧客') color.push('#01814a');
        else color.push('#01b468');
      }
      this.setState({name:name,color:color});
    }
    else if(type == '所有')
    {
      // var name = this.state.info.name;
      // var colot = this.state.info.color;
      // this.setState({name:name,color:color});
      console.warn(1);
    }
  }

  //關鍵字搜尋
  Search(input)
  {
    var key = input.text;
    var temp =[];
    for(var i=0;i<this.state.info.name.length;i++)
    {
      if(this.state.info.name[i].match(key) != null) temp.push(this.state.info.name[i]);
    }
    console.warn(temp);
    this.setState({name:temp})
  }

  //設置頂部導航欄的內容
    static navigationOptions = ({navigation, screenProps}) => ({
        //左側標題
        headerTitle: '客戶清單',
        //設置跳轉頁面左側返回箭頭後面的文本，默認是上一個頁面的標題
        headerBackTitle: null,
        //頂部標題欄的樣式
        headerStyle: {},
        //頂部標題欄文本的樣式
        headerTitleStyle: {fontSize:20,letterSpacing:5,textAlign:'center'},
    });

  render() {
    var cards =[];
    var name = this.state.name;
    let sortOption = [{
      value: '權重',
    }, {
      value: '今年業績',
    }, {
      value: '去年業績',
    }];
    let typeOption =[{
      value: '所有',
    }, {
      value: '顧客',
    }, {
      value: '淺客',
    }];
    //卡片製作
    for(var i=0;i<name.length;i++)
    {
      cards.push(
        <TouchableOpacity key={i}>
          <View style={[,{margin:10,backgroundColor:this.state.color[i]}]}>
            <Text  style={[Style.font_option,{color:'white',textAlign:'center'}]}>{this.state.name[i]}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <ScrollView style={[Style.container,Style.column]}>
        <SearchBar
          lightTheme
          containerStyle={{backgroundColor:'#eee'}}
          inputStyle={{backgroundColor:'white',borderRadius:500}}
          showLoading
          onChangeText={(text) => this.Search({text})}
        />
        <View style={Style.view_border,Style.row}>
          <View style={[,{flex:1,paddingLeft:10,paddingRight:10}]}>
            <Dropdown
            label='種類'
            data={typeOption}
            onChangeText={(value)=>{this.SetKey(value);}}
            />
          </View>
          <View style={[,{flex:1,paddingLeft:10,paddingRight:10}]}>
            <Dropdown
            label='排列方式'
            data={sortOption}
            onChangeText={(value)=>{this.SetKey(value);}}
            />
          </View>
        </View>
        {cards}

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
