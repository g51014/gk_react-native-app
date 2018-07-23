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
    this.state = {info:{'name':[],'address':[],'phone':[],'lastDate':[],'amount':[],'lastAmount':[]},name:[]};
  }

  GetCustomerList()
  {
    var info;
    var name=[],address=[],phone=[],lastDate=[],amount=[],lastAmount=[];
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
        }
        info = {'name':name,'address':address,'phone':phone,'lastDate':lastDate,'amount':amount,'lastAmount':lastAmount}
        this.setState({info:info,name:info.name});
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  Search(input)
  {
    // console.warn(input);
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
    for(var i=0;i<name.length;i++)
    {
      cards.push(
        <TouchableOpacity key={i}>
          <View style={[Style.view_border,{margin:10,backgroundColor:'white'}]}>
            <Text  style={[Style.font_option,{textAlign:'center'}]}>{this.state.name[0]}</Text>
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
          onChangeText= {this.Search.bind(this,5)}
        />
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
