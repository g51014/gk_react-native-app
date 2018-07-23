/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  Alert
} from 'react-native';
import DatePicker from './datePicker';
import Style from './style';
import OptionMenu from './option';
import ContentCard from './contentCard';
export default class AddScreen extends Component {
  constructor(props)
  {
    super(props);
    var date = new Date();
    var year = date.getFullYear();
    var month = (date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1);
    var day = date.getDate()<10?'0'+date.getDate():date.getDate();
    this.EnableRemind = this.EnableRemind.bind(this);
    this.DisableRemind = this.DisableRemind.bind(this);
    this.GetInfo = this.GetInfo.bind(this);
    this.GetSelectDate = this.GetSelectDate.bind(this);
    this.GetSelectOption = this.GetSelectOption.bind(this);
    this.Cancel = this.Cancel.bind(this);
    this.state = {
      type:['工作重點','會議','內部作業','內部教育訓練','外部作業','JoinCall','待辦事項','外部受訓','空區作業','活動/講座/團課','請假'],
      typeImg:[require('./img/type_3.png'),require('./img/type_3.png'),require('./img/type_3.png'),require('./img/type_3.png'),require('./img/type_3.png'),require('./img/type_3.png'),require('./img/type_3.png'),require('./img/type_3.png'),require('./img/type_3.png'),require('./img/type_3.png'),require('./img/type_3.png'),],
      onColor:'#009100',
      offColor:'black',
      currentType:0,
      currentOption:null,
      currentOptionContent:null,//當前小項內容
      customerMenuDisplay:'flex',
      selectOption:[],
      info:{type:'工作重點',selectDate:year+'-'+month+'-'+day,remind:true,title:null,place:null,content:{}},
      edit:false,
    };
  }

  Previous()
  {
    var currentType = this.state.currentType;
    var info = this.state.info;
    var editable = this.state.edit;
    var display = '';
    currentType--;
    if(currentType<0) currentType = 10;
    info.type = this.state.type[currentType];
    if(currentType == 0)
    {
      editable = false;
      display = 'flex';
    }
    else
    {
      editable = true;
      display = 'none';
    }
    this.setState({currentType:currentType,info:info,edit:editable,customerMenuDisplay:display});
  }

  Next()
  {
    var info = this.state.info;
    var currentType = this.state.currentType;
    var editable = this.state.edit;
    var display = '';
    currentType++;
    if(currentType>10) currentType = 0;
    info.type = this.state.type[currentType];
    if(currentType == 0)
    {
      editable = false;
      display = 'flex';
    }
    else
    {
      editable = true;
      display = 'none';
    }
    this.setState({currentType:currentType,info:info,edit:editable,customerMenuDisplay:display});
  }

  ToHome()
  {
    //回主選單
    console.warn('home');
  }

  Cancel()
  {
    this.props.navigation.navigate('Calendar');
    console.warn('cancel');
    //回到月曆介面
  }

  Confirm()
  {
    var info = this.state.info;
    var type = this.state.currentType;
    if(info.title == null || info.title =='') Alert.alert('標題不得為空');
    else
    {
      if(type == 1 || type == 2 || type ==3 || type == 10) info.color = '#7B68EE';
      else if (type == 6 || type == 8) info.color = '#d94600';
      else info.color = '#01b468';
      this.setState({info:info});
      console.warn(this.state.info);
    }
    //送出資料回到月曆介面
  }

//回傳customerMenu元件的內容
  GetCustomer(data)
  {
    var info = this.state.info;
    info.title = data;
    this.setState({info:info});
  }

//回傳contentcards元件的內容
  GetInfo(type,data)
  {
    var info = this.state.info
    // console.warn(type+data)
    if(type == '標題')
    {
      info.title = data
    }
    else if(type == '地點')
    {
      info.place = data
    }
    else {
      var option = type;
      info.content[option] = data;
    }
    this.setState({info:info});
  }

//回傳optionMenu元件已選擇的選項,type 0為取消,1為選擇
  GetSelectOption(option,type)
  {
    // console.warn(option+this.state.currentOptionContent);
    var info = this.state.info;
    var selectOption = this.state.selectOption;
    if(type == 'enable'){
      if(!selectOption.includes(option))
      {
         info.content[option] = '';
         selectOption.push(option);
         this.setState({selectOption:selectOption,info:info});
      }
    }
    else { //disable
      delete info.content[option];
      var index = selectOption.indexOf(option);
      selectOption.splice(index,1);
      this.setState({selectOption:selectOption,info:info});
    }
  }

//回傳datepicker元件的選擇日期
  GetSelectDate(date)
  {
    var info = this.state.info;
    info.selectDate = date;
    this.setState({info:info});
  }

  EnableRemind()
  {
    var info = this.state.info;
    info.remind = true;
    this.setState({onColor:'#009100',offColor:'black',info:info});
  }

  DisableRemind()
  {
    var info = this.state.info;
    info.remind = false;
    this.setState({onColor:'black',offColor:'#bb3d00',info:info});
  }

  //設置頂部導航欄的內容
    static navigationOptions = ({navigation, screenProps}) => ({
        //左側標題
        headerTitle: '新增行程',
        //設置跳轉頁面左側返回箭頭後面的文本，默認是上一個頁面的標題
        headerBackTitle: null,
        //頂部標題欄的樣式
        headerStyle: {},
        //頂部標題欄文本的樣式
        headerTitleStyle: {fontSize:20,letterSpacing:5,textAlign:'center'},
    });

  render() {
    // console.warn(this.state.info);
    // console.warn(this.state.currentOption);
    // console.warn(this.state.info.content[this.state.selectOption[0]]);
    // console.warn(this.state.selectOption);
    //動態製作小項卡片
    var option =[];
    for(var i=0;i<this.state.selectOption.length;i++)
    {
      var value = this.state.info.content[this.state.selectOption[i]];
      if(value == 'undefined') value = '';
      option.push(<ContentCard
      key ={i}
      title={this.state.selectOption[i]}
      value={value}
      edit={true}
      callback={this.GetInfo}
      placeholder={'選填'}
      />);
    }
    return (
      <ScrollView style={[Style.column,Style.container]}>
        //大項選單
        <View style={[styles.option,Style.row]}>
          <TouchableOpacity onPress={this.Previous.bind(this)}>
            <Image resizeMode='contain' style={[,{width:40}]} source={require('./img/icon_arrow_left.png')} ></Image>
          </TouchableOpacity>
          <Image style={[styles.class,{}]} source={this.state.typeImg[this.state.currentType]} ></Image>
          <TouchableOpacity onPress={this.Next.bind(this)}>
            <Image resizeMode='contain' style={[,{width:40}]} source={require('./img/icon_arrow_right.png')} ></Image>
          </TouchableOpacity>
        </View>
        //客戶選單
        //12小項選單
        <OptionMenu callback={this.GetSelectOption}/>
        //細節區
        <View style={[Style.column,{marginTop:50}]}>
          //標題
          <ContentCard edit={this.state.edit} callback={this.GetInfo} value={this.state.info.title} title={'標題'} placeholder={'必填'}/>
          //日期選單
          <View style={[Style.setArea,Style.row]}>
            <Text style={[Style.font_option,{flex:1}]}>日期：</Text>
            <DatePicker callback = {this.GetSelectDate} date={'2017-06-30'}/>
          </View>
          //地點
          <ContentCard edit={true} callback={this.GetInfo} title={'地點'} placeholder={'選填'}/>
          //選項內容
          {option}
          //提醒選單
          <View style={[Style.setArea,Style.row]}>
            <Text style={[Style.font_option,{flex:1}]}>提醒：</Text>
            <View style={[Style.row,{flex:2,justifyContent:'center'}]}>
              <Button color= {this.state.onColor} onPress={this.EnableRemind}  title='On'/>
            </View>
            <View style={[Style.row,{flex:2,justifyContent:'center',marginRight:20}]}>
              <Button color={this.state.offColor} onPress={this.DisableRemind} title='Off'/>
            </View>
          </View>
        </View>
        //icon區
        <View style={[,Style.footer,Style.row]}>
          <TouchableOpacity onPress={this.Cancel.bind(this)}>
            <Image resizeMode='center' style={[,{flex:1}]} source={require('./img/icon_cancel_60px.png')} ></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.ToHome.bind(this)}>
            <Image resizeMode='center' style={[,{flex:1}]} source={require('./img/icon_home_60px.png')} ></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.Confirm.bind(this)}>
            <Image resizeMode='center' style={[,{flex:1}]} source={require('./img/icon_check_60px.png')} ></Image>
          </TouchableOpacity>
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop:20,
    flex: 1,
    alignItems:'center'
  },
  titleText:{
    // backgroundColor:,
    textAlign:'center',
    fontSize:30,
    padding:10,
  },
  class:{
    width:150,
    height:150,
    marginRight:30,
    marginLeft:30
  },
  option:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  optionText:{
    textAlign:'center',
    fontSize:18,
    padding:10,
    backgroundColor:'black',
    color:'white'
  },
});
