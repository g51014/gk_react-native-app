import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import DatePicker from './datePicker';
import Style from './style';
import OptionMenu from './option';
import ContentCard from './contentCard';

export default class ReportResult extends Component {

  constructor(props)
  {
    super(props);
    this.GetSelectOption = this.GetSelectOption.bind(this);
    var option ={option1:{},option2:{},option3:{},option4:{},option5:{},option6:{},option7:{},option8:{},option9:{},option10:{},option11:{},option12:{}};
    for(var i=0;i<12;i++)
    {
      var optionNum = 'option' + (i+1);
      option[optionNum].content = '';
      option[optionNum].enable = false;
    }
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
      info:{type:'工作重點',remind:true,title:null,place:null,option:option},
      edit:false,
    };
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

  //回傳optionMenu元件已選擇的選項,type 0為取消,1為選擇
    GetSelectOption(optionTitle,optionId,type)
    {
      var info = this.state.info;
      var selectOption = this.state.selectOption;
      var num = 'option'+(optionId+1);
      if(type == 'enable'){
        if(!selectOption.includes(optionTitle))
        {
           selectOption.push(optionTitle);
           this.setState({selectOption:selectOption});
           info.option[num].enable = true;
           this.setState({info:info});
        }
      }
      else { //disable
        var index = selectOption.indexOf(optionTitle);
        selectOption.splice(index,1);
        this.setState({selectOption:selectOption});
      }
    }

  //設置頂部導航欄的內容
    static navigationOptions = ({navigation, screenProps}) => ({
        //左側標題
        headerTitle: '結果回報',
        //設置跳轉頁面左側返回箭頭後面的文本，默認是上一個頁面的標題
        headerBackTitle: null,
        //頂部標題欄的樣式
        headerStyle: {},
        //頂部標題欄文本的樣式
        headerTitleStyle: {fontSize:20,letterSpacing:5,textAlign:'center'},
    });

  render() {
    console.warn(this.state.info);
    return (
      <ScrollView style={[Style.column,Style.container]}>
        <View>
          <Text style={Style.font_option}></Text>
        </View>
        //12小項選單
        <OptionMenu callback={this.GetSelectOption} cancel={false}/>
        //icon區
        <View style={[,Style.footer,Style.row]}>
          <TouchableOpacity onPress={this.Cancel.bind(this)}>
            <Image resizeMode='center' style={[,{flex:1}]} source={require('./img/icon_cancel_60px.png')} ></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.ToHome.bind(this)}>
            <Image resizeMode='center' style={[,{flex:1}]} source={require('./img/icon_home_60px.png')} ></Image>
          </TouchableOpacity>
          <TouchableOpacity >
            <Image resizeMode='center' style={[,{flex:1}]} source={require('./img/icon_check_60px.png')} ></Image>
          </TouchableOpacity>
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
