/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
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
    this.Simplify = this.Simplify.bind(this);
    this.state = {
      info:{id:[],name:[],address:[],phone:[],lastDate:[],amount:[],lastAmount:[],color:[]},
      name:[], //當前顯示客戶名稱
      color:[], //當前顯示客戶顏色
      display:[], //當前顯示客戶詳細內容顯示方式
      index:[], //當前顯示客戶的編號,indexTemp為目前條件的index備份,除關鍵字查詢外都會與index相同
      key:{type:'所有'}
    };
  }

  GetCustomerList()
  {
    var info;
    var  id=[],name=[],address=[],phone=[],lastDate=[],amount=[],lastAmount=[],color=[],type=[],weight=[],display=[],index=[];
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
          amount.push(Math.floor(response[i].Amount));
          lastAmount.push(Math.floor(response[i].LastAmount));
          weight.push(response[i].Weighted);
          display.push('none');
          if(response[i].Type == 'account')
          {
            color.push('#01814a');
            type.push('客戶');
          }
          else
          {
            type.push('淺客');
            color.push('#01b468');
          }
          index.push(i);
          id.push(response[i].id);
        }
        info = {id:id,name:name,address:address,phone:phone,lastDate:lastDate,amount:amount,lastAmount:lastAmount,color:color,type:type,weight:weight};
        this.setState({info:info,name:info.name,color:info.color,display:display,index:index,indexTemp:index});
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  //更新排列條件
  SetKey(value)
  {
    var key = this.state.key;
    var display = [];
    //reset display
    for(var i=0;i<this.state.display.length;i++)
    {
      display.push('none');
    }
    if(value == '客戶' || value == '淺客'||value=='所有')
    {
      key.type = value;
    }
    else
    {
      key.sort = value;
    }
    this.setState({key:key,display:display});
    this.Sort();
  }

  //排列
  Sort()
  {
    var type = this.state.key.type;
    var sort = this.state.key.sort;
    //type篩選
    if( type != '所有')
    {
      var index = [];
      //計算符合條件的店家在陣列中位置
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
        if(type == '客戶') color.push('#01814a');
        else color.push('#01b468');
      }
      this.setState({name:name,color:color,index:index,indexTemp:index});
    }
    else if(type == '所有')
    {
      var index = [];
      var name = this.state.info.name;
      var color = this.state.info.color;
      for(var i=0;i<this.state.info.name.length;i++)
      {
        index.push(i);
      }
      this.setState({name:name,color:color,index:index,indexTemp:index});
    }
    //sort排列
    var name = this.state.name;
    if(sort == '權重')
    {
      var weight = [];
      var index =[];
      var temp = [];
      var color = type=='所有'? []:this.state.color;
      //列出篩選後的店家的權重
      for(var i =0;i<name.length;i++)
      {
        for(var j=0;j<this.state.info.name.length;j++)
        {
          if(this.state.info.name[j] == name[i])
          {
            weight.push(this.state.info.weight[j]);
          }
        }
      }
      //排列權重(大到小)
      weight.sort((a,b)=>{return b-a;})
      // console.warn(weight);
      //計算依照權重排列後的店家名稱
      for(var i=0;i<weight.length;i++)
      {
        for(var j=0;j<this.state.info.weight.length;j++)
        {
          if(this.state.info.weight[j]==weight[i]  && !temp.includes(this.state.info.name[j]))
          {
            if(type == '所有')
            {
               temp.push(this.state.info.name[j]);
               color.push(this.state.info.color[j]);
               index.push(j);
            }
            else {
              if(this.state.info.type[j] == type)
              {
                 temp.push(this.state.info.name[j]);
                 index.push(j);
              }
            }
          }
        }
      }
      this.setState({name:temp,color:color,index:index,indexTemp:index});
    }
    else if(sort == '今年業績')
    {
      var amount = [];
      var index =[];
      var temp = [];
      var color = type=='所有'? []:this.state.color;
      //列出篩選後的店家的今年業績
      for(var i =0;i<name.length;i++)
      {
        for(var j=0;j<this.state.info.name.length;j++)
        {
          if(this.state.info.name[j] == name[i])
          {
            amount.push(this.state.info.amount[j]);
          }
        }
      }
      //排列今年業績(大到小)
      amount.sort((a,b)=>{return b-a;})
      //計算依照權重排列後的店家名稱
      for(var i=0;i<amount.length;i++)
      {
        for(var j=0;j<this.state.info.amount.length;j++)
        {
          if(this.state.info.amount[j]==amount[i]  && !temp.includes(this.state.info.name[j]))
          {
            if(type == '所有')
            {
               temp.push(this.state.info.name[j]);
               color.push(this.state.info.color[j]);
                index.push(j);
            }
            else {
              if(this.state.info.type[j] == type)
              {
                temp.push(this.state.info.name[j]);
                index.push(j);
              }
            }
          }
        }
      }
      this.setState({name:temp,color:color,index:index,indexTemp:index});
    }
    else if(sort == '去年業績')
    {
      var lastAmount = [];
      var index =[];
      var temp = [];
      var color = type=='所有'? []:this.state.color;
      //列出篩選後的店家的去年業績
      for(var i =0;i<name.length;i++)
      {
        for(var j=0;j<this.state.info.name.length;j++)
        {
          if(this.state.info.name[j] == name[i])
          {
            lastAmount.push(this.state.info.lastAmount[j]);
          }
        }
      }
      //排列去年業績(大到小)
      lastAmount.sort((a,b)=>{return b-a;})
      //計算依照去年業績排列後的店家名稱
      for(var i=0;i<lastAmount.length;i++)
      {
        for(var j=0;j<this.state.info.lastAmount.length;j++)
        {
          if(this.state.info.lastAmount[j]==lastAmount[i]  && !temp.includes(this.state.info.name[j]))
          {
            if(type == '所有')
            {
               temp.push(this.state.info.name[j]);
               color.push(this.state.info.color[j]);
               index.push(j);
            }
            else {
              if(this.state.info.type[j] == type)
              {
                temp.push(this.state.info.name[j]);
                index.push(j);
              }
            }
          }
        }
      }
      this.setState({name:temp,color:color,index:index,indexTemp:index});
    }
  }

  //簡化數字
  Simplify(num)
  {
    var simpleNum;
    if(num < 10000) simpleNum = num;
    else {
      simpleNum = Math.round(num/10000) + '萬';
    }
    return simpleNum;
  }

  //顯示細節
  ShowDetail(index)
  {
    var detail = [];
    for(var i=0;i<this.state.display.length;i++)
    {
      if(i == index) detail.push('flex');
      else detail.push('none');
    }
    this.setState({display:detail});
  }

  //關鍵字搜尋
  Search(input)
  {
    var indexTemp = this.state.indexTemp;
    var type = this.state.key.type;
    var key = input.text;
    var index =[];
    for(var i=0;i<this.state.indexTemp.length;i++) if(this.state.info.name[this.state.indexTemp[i]].match(key) != null) index.push(this.state.indexTemp[i]);
    this.setState({index:index})
  }
  //提交，i為當前選擇客戶之index
  Confirm(i)
  {
    var data = {id:this.state.info.id[i],name:this.state.info.name[i],type:this.state.info.type[i]};
    const {navigate,goBack,state} = this.props.navigation;
    state.params.callback(data); //回傳資料到新增任務頁面
    this.props.navigation.goBack(); //回前一頁
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
    var index = this.state.index;
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
      value: '客戶',
    }, {
      value: '淺客',
    }];
    //卡片製作
    for(var i=0;i<index.length;i++)
    {
      cards.push(
        <TouchableOpacity key={i} onPress={this.ShowDetail.bind(this,i)}>
          <View style={[,{margin:10,backgroundColor:this.state.info.color[index[i]]}]}>
            //title
            <View style={[Style.row,{padding:10}]}>
              <Text  style={[Style.font_option,{flex:2,color:'white',textAlign:'center'}]}>{this.state.info.name[index[i]]}</Text>
              <Text  style={[Style.font_option,{fontSize:16,flex:2,color:'white',textAlign:'center'}]}>{this.Simplify(this.state.info.amount[index[i]])}</Text>
              <TouchableOpacity onPress={this.Confirm.bind(this,this.state.index[i])} style={{flex:1,backgroundColor:'white'}}>
                <Text style={[Style.font_option,{borderWidth:1,borderColor:'white',color:this.state.info.color[index[i]],fontSize:16,textAlign:'center'}]}>送出</Text>
              </TouchableOpacity>
            </View>
            //details
            <View style={[,{backgroundColor:'white',display:this.state.display[i]}]}>
              <View style={{paddingLeft:40}}>
                <Text  style={[Style.font_option,{fontSize:16,color:this.state.info.color[index[i]],textAlign:'left'}]}>{this.state.info.address[index[i]]}</Text>
                <Text  style={[Style.font_option,{fontSize:16,color:this.state.info.color[index[i]],textAlign:'left'}]}>電話：{this.state.info.phone[index[i]]}</Text>
                <Text  style={[Style.font_option,{fontSize:16,color:this.state.info.color[index[i]],textAlign:'left'}]}>業績：{this.Simplify(this.state.info.amount[index[i]])} / {this.Simplify(this.state.info.lastAmount[index[i]])}</Text>
              </View>
            </View>
            //
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
