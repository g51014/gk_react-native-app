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
    this.state = {
      selectOption:[], //驗證是否已選
      info:{type:'工作重點',remind:true,title:null,place:null,option:this.props.optionInfo},
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

  //回傳optionMenu元件已選擇的選項
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
    return (
      <ScrollView style={[Style.column,Style.container]}>
        <View>
          <Text style={Style.font_option}>類別：</Text>
        </View>
        //12小項選單
        <OptionMenu callback={this.GetSelectOption} cancel={false} mode={'custom'}/>
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

//預設值
  ReportResult.defaultProps ={
  //按鈕資訊
  optionInfo:{option1:{enable:true,content:null},option2:{enable:true,content:null},option3:{enable:false,content:null},option4:{enable:false,content:null},option5:{enable:false,content:null},option6:{enable:false,content:null},option7:{enable:false,content:null},option8:{enable:false,content:null},option9:{enable:false,content:null},option10:{enable:false,content:null},option11:{enable:false,content:null},option12:{enable:false,content:null}}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
