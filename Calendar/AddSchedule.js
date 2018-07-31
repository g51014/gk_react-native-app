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
    var option ={option1:{},option2:{},option3:{},option4:{},option5:{},option6:{},option7:{},option8:{},option9:{},option10:{},option11:{},option12:{}};
    for(var i=0;i<12;i++)
    {
      var optionNum = 'option' + (i+1);
      option[optionNum].content = '';
      option[optionNum].enable = false;
      option[optionNum].title = '';
    }
    this.EnableRemind = this.EnableRemind.bind(this);
    this.DisableRemind = this.DisableRemind.bind(this);
    this.GetInfo = this.GetInfo.bind(this);
    this.GetSelectDate = this.GetSelectDate.bind(this);
    this.GetSelectOption = this.GetSelectOption.bind(this);
    this.Cancel = this.Cancel.bind(this);
    this.ToCustomerMenu = this.ToCustomerMenu.bind(this);
    this.state = {
      type:['工作重點','會議','內部作業','內部教育訓練','外部作業','JoinCall','待辦事項','外部受訓','空區作業','活動/講座/團課','請假'],
      typeImg:[require('./img/type_3.png'),require('./img/type_3.png'),require('./img/type_3.png'),require('./img/type_3.png'),require('./img/type_3.png'),require('./img/type_3.png'),require('./img/type_3.png'),require('./img/type_3.png'),require('./img/type_3.png'),require('./img/type_3.png'),require('./img/type_3.png'),],
      onColor:'#009100',
      offColor:'black',
      currentType:0,
      customerMenuDisplay:'flex',
      selectOption:[],
      info:{type:'工作重點',selectDate:year+'-'+month+'-'+day,remind:true,title:null,place:null,option:option},
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

  //工作重點
  ToCustomerMenu()
  {
    var info = this.state.info;
    //只有選擇工作重點時才前往選擇客戶
    if(this.state.currentType == 0)
    {
      this.props.navigation.navigate('CustomerMenu',{
        //獲得CustomerMenu的內容
        callback:(data) => {
          info.title = '拜訪'+data.name;
          this.setState({customer:data,info:info});
        },
      });
    }
  }

  Confirm()
  {
    var info = this.state.info;
    var type = this.state.currentType;
    if(info.title == null || info.title =='')
    {
      if(type == 0) Alert.alert('請選擇客戶');
      else Alert.alert('標題不得為空');
    }
    //成功
    else
    {
      if(type == 1 || type == 2 || type ==3 || type == 10) info.color = '#7B68EE';
      else if (type == 6 || type == 8) info.color = '#d94600';
      else info.color = '#01b468';
      this.setState({info:info});
      //post到後端
      if(type == 0)
      {
        console.warn(this.state.info.option);
        console.warn(this.state.customer);
      }
      else {
        console.warn(this.state.info);
      }
    }
    //送出資料回到月曆介面

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
      for(var i=0;i<Object.getOwnPropertyNames(this.state.info.option).length;i++)
      {
        var num = 'option'+(i+1);
        if(type == info.option[num].title) info.option[num].content = data;
      }
    }
    this.setState({info:info});
  }

//回傳optionMenu元件已選擇的選項,type
  GetSelectOption(optionTitle,optionId,type)
  {
    // console.warn(option+this.state.currentOptionContent);
    var info = this.state.info;
    var selectOption = this.state.selectOption;
    var num = 'option'+(optionId+1);
    if(type == 'enable'){
      if(!selectOption.includes(optionTitle))
      {
         selectOption.push(optionTitle);
         info.option[num].enable = true;
         info.option[num].title = optionTitle;
         this.setState({selectOption:selectOption,info:info});
      }
    }
    else { //disable
      var index = selectOption.indexOf(optionTitle);
      selectOption.splice(index,1); //移除selectOption中的option
      info.option[num].enable = false;
      info.option[num].content = '';
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
    // console.warn(this.state.currentOption);
    // console.warn(this.state.info.content[this.state.selectOption[0]]);
    // console.warn(this.state.selectOption);
    //動態製作小項卡片
    var option =[];
    for(var i=0;i<Object.getOwnPropertyNames(this.state.info.option).length;i++)
    {
      var num = 'option'+(i+1);
      if(this.state.info.option[num].enable)
      {
        option.push(<ContentCard
        key ={i}
        title={this.state.info.option[num].title}
        value={this.state.info.option[num].content}
        edit={true}
        callback={this.GetInfo}
        placeholder={'選填'}
        />);
      }
    }
    return (
      <ScrollView style={[Style.column,Style.container]}>
        //大項選單
        <View style={[styles.option,Style.row]}>
          <TouchableOpacity onPress={this.Previous.bind(this)}>
            <Image resizeMode='contain' style={[,{width:40}]} source={require('./img/icon_arrow_left.png')} ></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.ToCustomerMenu} activeOpacity={this.state.type.indexOf(this.state.info.type)+0.3}>
            <Image style={[styles.class,{}]} source={this.state.typeImg[this.state.currentType]} ></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.Next.bind(this)}>
            <Image resizeMode='contain' style={[,{width:40}]} source={require('./img/icon_arrow_right.png')} ></Image>
          </TouchableOpacity>
        </View>
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
