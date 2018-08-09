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
import ImagePicker from 'react-native-image-picker';
import ImageMultiplePicker from 'react-native-image-crop-picker';

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
    console.log(this.state.info.option.option1.photo.name);
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

    //選擇圖片
    ChoosePic(i) {
      var options = {
        cancelButtonTitle:'取消',
        takePhotoButtonTitle:'拍照',
        chooseFromLibraryButtonTitle:null,
        customButtons: [
          {name: 'hangge', title: '相簿圖片'},
        ],
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      };
        ImagePicker.showImagePicker(options, (response) => {
        // console.warn('Response = ', response);
        if (response.didCancel) {
          console.log('用户取消了选择！');
        }
        else if (response.error) {
          alert("錯誤：" + response.error);
        }
        //選擇多張圖片
        else if (response.customButton) {
          this.ChooseMultiplePic(i);
        }
        //拍照
        else {
          this.SetOptionPhoto(response,i);
        }
      });
     }

     //選擇多個圖片
     ChooseMultiplePic(optionId)
     {
       ImageMultiplePicker.openPicker({
          multiple: true,
          includeBase64: true
        })
        .then(response => {
          this.SetOptionPhoto(response,optionId);
        });
     }

     //設定選項圖片資料
     SetOptionPhoto(photoData,optionId)
     {
       var num = 'option'+(optionId+1);
       var info = this.state.info;
       var uri = this.state.info.option[num].photo.uri; //base64
       var name = this.state.info.option[num].photo.name; //檔名編號
       var amount = this.state.info.option[num].photo.name.length; //當前圖片數量
       //相簿選取data為陣列
       if(Array.isArray(photoData))
       {
         for(var i=0;i<photoData.length;i++)
         {
            uri.push(photoData[i].data);
            name.push(amount+i);
         }
       }
       //相機拍照data只有一個
       else
       {
         uri.push(photoData.data);
         name.push(amount);
       }
       console.warn(uri);
       console.warn(name);
       info.option[num].photo.uri = uri;
       info.option[num].photo.name = name;
       // console.warn(info.option['option'+(optionId+1)].photo.name);
       this.setState({
         info:info,
       });
     }

     //移除圖片
     RemoveOptionPhoto(photoName,num)
     {
       var info = this.state.info;
       var uri = this.state.info.option[num].photo.uri;
       var name = this.state.info.option[num].photo.name;
       var index = name.indexOf(photoName); //點選圖片在當前選項圖片序列中的位置
       name.pop(); //編號-1
       uri.splice(index,1); //移除index的圖片 
       info.uri = uri;
       info.name = name;
       this.setState({info:info});
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
        var image = [];
        //有圖片的話鑲入圖片
        if(this.state.info.option[num].photo.uri.length>0)
        {
          for(var j=0;j<this.state.info.option[num].photo.uri.length;j++)
          {
            image.push(
              //Image的source可使用uri屬性直接放連結或是使用require()後的連結
              <TouchableOpacity key={j} onLongPress={this.RemoveOptionPhoto.bind(this,j,num)}>
                <Image style={[{height:198,width:300,alignSelf:'center',margin:10,borderWidth:0.5,backgroundColor:'#fcfcfc',borderColor:'#adadad'}]} source={{uri: 'data:image/jpeg;base64,' + this.state.info.option[num].photo.uri[j]}}/>
              </TouchableOpacity>
            );
          }
        }
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
            {image}
            <TouchableOpacity onPress={this.ChoosePic.bind(this,i)} style={{flex:1}}>
              <View style={[{borderWidth:0.5,backgroundColor:color,borderColor:'#adadad',marginBottom:10,marginTop:10,marginLeft:70,marginRight:70}]}>
                  <Text  style={[Style.font_option,{textAlign:'center',color:'white'}]}>上傳圖片</Text>
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
