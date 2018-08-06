import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import DatePicker from './datePicker';
import Style from './style';
import OptionMenu from './option';
import CustomInput from './customInput';

export default class ReportResult extends Component {

  constructor(props)
  {
    super(props);
    var key = this.props.navigation.state.params.key;
    var time = this.props.navigation.state.params.time;
    var option = this.props.navigation.state.params.option;
    var type = this.props.navigation.state.params.type;
    var title = this.props.navigation.state.params.title;
    this.GetSelectOption = this.GetSelectOption.bind(this);
    this.SetOptionContent = this.SetOptionContent.bind(this);
    this.state = {
      optionTitle:['盤點','退貨','轉貨','簽約','寄單','收款','提報','陳列','轉銷','活動','教學','其他'],
      selectOption:[], //驗證是否已選
      //行程資訊
      info:{type:type,time:time,remind:true,title:title,option:option,key:key},
      edit:false,
      text:'', //目前修改小項的內容
    };
  }

  Cancel()
  {
    this.props.navigation.navigate('Calendar');
    console.warn('cancel');
    //回到月曆介面
  }

  //提交更新行程資料
  Confirm()
  {
    //post data
    console.warn(this.state.info);
    // this.props.navigation.navigate('Calendar');
  }

  //更新option content
  SetOptionContent(optionId,content)
  {
    var info = this.state.info;
    var num = 'option'+(optionId+1);
    info.option[num].content = content;
    this.setState({info:info});
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
    var cards=[];
    for(var i=0;i<Object.getOwnPropertyNames(this.state.info.option).length;i++)
    {
      var num = 'option'+(i+1);
      var color;
      if(i == 0 || i == 1 || i == 2) color = '#d94600';
      else if (i == 3 || i==4||i==5) color = '#01b468';
      else if (i == 6 || i==7 || i==8 || i==9 || i==10 ) color = '#5599FF';
      else color = '#CC6600';
      if(this.state.info.option[num].enable)
      {
        cards.push(
          <View key={i} style={[{borderWidth:0.5,backgroundColor:'#fcfcfc',borderColor:color,padding:12,marginBottom:10,marginTop:10,marginLeft:25,marginRight:25}]}>
            <Text style={[Style.font_option,{fontSize:25,textAlign:'center',color:color}]}>{this.state.optionTitle[i]}</Text>
            <CustomInput
            value={this.state.info.option[num].content}
            id={i}
            callback={this.SetOptionContent}
            multiline={true}
            placeholder={'請輸入敘述'}
            />
            <TouchableOpacity style={{flex:1}}>
              <View style={[{borderWidth:0.5,backgroundColor:color,borderColor:'#adadad',marginBottom:10,marginTop:10,marginLeft:70,marginRight:70}]}>
                  <Text style={[Style.font_option,{textAlign:'center',color:'white'}]}>上傳圖片</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      }
    }
    return (
      <ScrollView style={[Style.column,Style.container]}>
        <View style={[{padding:13}]}>
          //行程資訊
          <View style={[{borderWidth:0.5,backgroundColor:'#fcfcfc',borderColor:'#adadad',padding:12,marginBottom:10,marginTop:10}]}>
            <Text style={[Style.font_option,{color:'#272727'}]}>名稱： {this.state.info.title}</Text>
            <Text style={[Style.font_option,{color:'#272727'}]}>類別： {this.state.info.type}</Text>
            <Text style={[Style.font_option,{color:'#272727'}]}>時間： {this.state.info.time}</Text>
          </View>
          //12小項選單
          <OptionMenu callback={this.GetSelectOption} cancel={false} mode={'custom'} optionInfo={this.state.info.option}/>
          //回報區
          {cards}
        </View>
        //icon區
        <View style={[Style.footer,Style.row,{}]}>
          <TouchableOpacity onPress={this.Cancel.bind(this)}>
            <Image resizeMode='center' style={[,{flex:1}]} source={require('./img/icon_cancel_90px.png')} ></Image>
          </TouchableOpacity>
          <View style={[,{flex:1}]}></View>
          <TouchableOpacity onPress={this.Confirm.bind(this)}>
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
