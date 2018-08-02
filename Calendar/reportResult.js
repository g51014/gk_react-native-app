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
    var time = this.props.navigation.state.params.time;
    var option = this.props.navigation.state.params.option;
    var type = this.props.navigation.state.params.type;
    var place = this.props.navigation.state.params.place;
    var title = this.props.navigation.state.params.title;
    this.GetSelectOption = this.GetSelectOption.bind(this);
    this.state = {
      selectOption:[], //驗證是否已選
      //行程資訊
      info:{type:type,time:time,remind:true,title:title,place:place,option:option},
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
        <View style={[{padding:13}]}>
          //行程資訊
          <View style={[{borderWidth:0.5,backgroundColor:'#fcfcfc',borderColor:'#adadad',padding:12,marginBottom:10,marginTop:10}]}>
            <Text style={[Style.font_option,{color:'#272727'}]}>名稱： {this.state.info.title}</Text>
            <Text style={[Style.font_option,{color:'#272727'}]}>類別： {this.state.info.type}</Text>
            <Text style={[Style.font_option,{color:'#272727'}]}>時間： {this.state.info.time}</Text>
            <Text style={[Style.font_option,{color:'#272727'}]}>地點： {this.state.info.place}</Text>
          </View>
          //12小項選單
          <OptionMenu callback={this.GetSelectOption} cancel={false} mode={'custom'} optionInfo={this.state.info.option}/>
          //回報區
          <View style={[Style.view_border,{marginTop:10,padding:5}]}>
            <Text style={[Style.font_option,{textAlign:'center'}]}>盤點</Text>
            <View style={Style.view_border}></View>
          </View>
        </View>
        //icon區
        <View style={[,Style.footer,Style.row]}>
          <TouchableOpacity onPress={this.Cancel.bind(this)}>
            <Image resizeMode='center' style={[,{flex:1}]} source={require('./img/icon_cancel_90px.png')} ></Image>
          </TouchableOpacity>
          <View style={[,{flex:1}]}></View>
          <TouchableOpacity >
            <Image resizeMode='center' style={[,{flex:1}]} source={require('./img/icon_check_90px.png')} ></Image>
          </TouchableOpacity>
        </View>

      </ScrollView>
    );
  }
}

//預設值
  ReportResult.defaultProps ={

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
