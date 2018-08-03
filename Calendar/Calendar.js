/* @flow */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import {Calendar} from 'react-native-calendars'
import offlineData from './data/data.json'
import Style from './style';

export default class CalendarTest extends Component {
  //props 為父項傳入的參數
  constructor(props) {
    //計算當前日期
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    if (month < 10) month = '0'+month;
    if (day < 10) day = '0'+day;
    super(props);
    this.state={selected:year+'-'+month+'-'+day,currentDate:year+'-'+month+'-'+day,activity:[],type:[],activityDate:[]};
    this.onDayPress = this.onDayPress.bind(this);
    this.OnMonthChange = this.OnMonthChange.bind(this);
    //預設今日
    this.GetAllActivityDate(this.state.currentDate);
    this.GetData(this.state.currentDate);
  }

  ToAddSchedule()
  {
    this.props.navigation.navigate('AddSchedule');
  }

//前往單筆行程
  ToCards(key)
  {
    this.props.navigation.navigate('ReportResult',{time:'2018-07-01',
    type:'會議',
    place:'公司',
    title:'內部會議',
    option:{
      option1:{enable:true,content:'66556123123132132461354136655612312313213246135413eujjdlwheowpj6666556123123132132461354136655612312313213246135413eujjdlwheowpj66fjewifj'},
      option2:{enable:true,content:'testtest'},
      option3:{enable:false,content:null},
      option4:{enable:false,content:null},
      option5:{enable:false,content:null},
      option6:{enable:false,content:null},
      option7:{enable:false,content:null},
      option8:{enable:false,content:null},
      option9:{enable:false,content:null},
      option10:{enable:false,content:null},
      option11:{enable:false,content:null},
      option12:{enable:false,content:null}}})
  }

//點選單日
  onDayPress(day) {
    // console.warn(day);
      this.setState({
        selected: day.dateString
      });
    // console.warn(day.dateString);
    this.GetData(day.dateString);
  }

  //切換月份 data = {yeat,month,day,timestamp,dateString}
  OnMonthChange(data)
  {
    //刷新當月標記
    this.GetAllActivityDate(this.CombineYMD(data.year,data.month,data.day));
  }

//丟入date索取當日的行程資料,post date到後端回傳
  GetData(date){
    var url = 'http://localhost:8081/Calendar/data/data.json';
    if(date == '2018-07-01') url ='http://localhost:8081/Calendar/data/data_0701.json';
    // console.warn(offlineData);
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        this.setState({activity:response.activity,type:response.type,color:response.color})
        // console.warn(response);
      })
      .catch((error) =>{
        console.error(error);
      });
  }

//獲得丟入date該月份所有有行程的日子,post date到後端回傳整月行程進行資料重組
  GetAllActivityDate(date)
  {
    // console.warn(date);
    var url = 'http://localhost:8081/Calendar/data/main_data.json';
    var list = [];
    // if(date.substring(0,7) == '2018-07') url ='http://localhost:8081/data/main_data_7.json';
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        //解析整月行程開始日期並建立成list
        for(var i=0;i<response.length;i++)
        {
          var exist = false;
          for(var j=0; j<list.length;j++)
          {
            if(response[i].start.substring(0,10) == list[j]) exist = true;
          }
          if(!exist) list.push(response[i].start.substring(0,10));
        }
        //存入state
        this.setState({activityDate:list});
      })
      .catch((error) =>{
        console.error(error);
      });
  }
 //製作日期格式
  CombineYMD(y,m,d)
  {
    if(m < 10) m = '0'+m;
    if(d < 10) d = '0'+d;
    return y+'-'+m+'-'+d;
  }

  //設置頂部導航欄的內容
    static navigationOptions = ({navigation, screenProps}) => ({
        //左側標題
        headerTitle: null,
        //設置跳轉頁面左側返回箭頭後面的文本，默認是上一個頁面的標題
        headerBackTitle: null,
        //頂部標題欄的樣式
        headerStyle: {},
        //頂部標題欄文本的樣式
        headerTitleStyle: {fontSize:20,letterSpacing:5,textAlign:'center'},
    });

  render() {
    // console.warn(Date());
    var cards = [];
    var backgroundColor = [];
    var content = this.state.activity;
    var type = this.state.type;
    var color = this.state.color;
    var data = new Object();
    const mark = {
        [this.state.selected]: {
          customStyles: {
            text: {
              fontWeight:'bold',
              color: '#5599FF',
            },
        }},
        //currentDate
        [this.state.currentDate]:{
          customStyles: {
            container:{
              backgroundColor:'#CC6600'
            },
            text: {
              fontWeight:'bold',
              color: 'white',
            },
        }},
    }
    //標記有行程的日期
    for(var i=0;i<this.state.activityDate.length;i++)
    {
      mark[this.state.activityDate[i]] = {
        customStyles: {
          text: {
            fontWeight:'bold',
            color: '#d94600',
          },
      }}
    }
    //設定卡片
    data = {content,type,color};
    // console.warn(this.state.type);

    // console.warn(data);
    for(var i =0;i < data.type.length;i++)
    {
      cards.push(
          <TouchableOpacity key={i} onPress = {this.ToCards.bind(this,i)}>
            <Text style={{textAlign: 'center',
            borderColor: '#bbb',
            padding: 10,
            backgroundColor: data.color[i],
            margin:5,
            marginLeft:15,
            marginRight:15,
            borderWidth:1,
            color:'white',
            fontSize:16,
            fontWeight:'bold',}}>{data.content[i]}</Text>
          </TouchableOpacity>
      );
    }

    // for(var i=0;i<cards.length;i++)
    // {
    //   if(data.type[i] == 0)
    //   {
    //     cards[i].props.style.backgroundColor = '#7B68EE';
    //     // console.warn(cards[1].props.style);
    //   }
    //   else if (data.type[i] == 1) cards[i].props.style.backgroundColor = '#01b468';
    //   else if (data.type[i] == 2) cards[i].props.style.backgroundColor = '#d94600';
    // }

    return (
      <ScrollView style={styles.container}>
        <View style={[styles.row,{paddingLeft:15,paddingRight:15}]}>
          <TouchableOpacity>
            <Image resizeMode='center' style={[styles.icon,styles.botton]} source={require('./img/icon_search.png')}></Image>
          </TouchableOpacity>
          <Text style = {[styles.text,styles.date]}>{this.state.selected}</Text>
          <TouchableOpacity onPress = {this.ToAddSchedule.bind(this)}>
            <Image resizeMode='center' style={[styles.icon,styles.botton]} source={require('./img/icon_calendar_add.png')}></Image>
          </TouchableOpacity>
        </View>
        <Calendar
        style={styles.calendar}
        theme={{calendarBackground:'#F8F8FF', textSectionTitleColor: 'black',arrowColor: 'black', }}
        disableMonthChange
        hideExtraDays
        onMonthChange={this.OnMonthChange}
        onDayPress={this.onDayPress}
        markingType={'custom'}
        markedDates={mark}
        />
        <View style={styles.row}>
          <Image resizeMode='center' style={styles.icon} source={require('./img/icon_ring.png')}></Image>
          <Text style={styles.remind}>今日提醒</Text>
        </View>
          <TouchableOpacity>
            {cards}
          </TouchableOpacity>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  row:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'center',
    paddingLeft:0,
  },
  icon:{
    width:30,
    flexDirection:'row',
    backgroundColor:'#eee',
    // borderWidth:1,
    // borderColor:'red'
  },
  botton:{
    flex:1
  },
  remind:{
    width:80,
    flexDirection:'row',
    textAlign: 'left',
    borderColor: '#bbb',
    paddingTop: 17,
    paddingLeft:5,
    backgroundColor: '#eee',
    borderBottomWidth:1,
    // borderWidth:1,
    // borderColor:'red'
  },
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 320
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee',
    fontSize:18,
    // fontWeight:'bold',
    color:'#4f4f4f',
    // borderWidth:1,
    // borderColor:'red'
  },
  date:{
    paddingTop:15,
    flex:3
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
  }
});
