import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import { SearchBar } from 'react-native-elements';
import DropdownMenu from 'react-native-dropdown-menu';
import { Dropdown } from 'react-native-material-dropdown';
import Style from './style';

export default class SearchScreen extends Component {

  constructor(props)
  {
    super(props);
    var data = this.props.navigation.state.params.data;
    var title = []
    for(var i=0;i<data.length;i++)
    {
        title.push(data[i].title);

    }
    this.state = {
      title:title,
      data:data,
      index:null
    };
  }

  //關鍵字搜尋
  Search(input)
  {
    var key = input.text;
    var index = [];
    for(var i=0;i<this.state.title.length;i++)
    {
      if(this.state.title[i].match(key)!=null) index.push(i);
    }
    this.setState({index:index});
  }

  ToCards(data)
  {
    this.props.navigation.navigate('ReportResult',{
      time:data.time,
      type:data.type,
      title:data.title,
      option:data.option,
      id:data.id
    });
  }

  render() {
    cards = [];
    var index = this.state.index
    if(index != null)
    {
      for(var i=0;i<index.length;i++)
      {
        cards.push(
          <TouchableOpacity key={i} onPress = {this.ToCards.bind(this,this.state.data[index[i]])}>
            <View style={[,{margin:10,backgroundColor:this.state.data[index[i]].color}]}>
              //title
              <View style={[Style.row,{padding:10}]}>
                <Text  style={[Style.font_option,{flex:2,color:'white',textAlign:'center'}]}>{this.state.title[index[i]]}</Text>
                <Text  style={[Style.font_option,{fontSize:16,flex:2,color:'white',textAlign:'center'}]}>{this.state.data[index[i]].start}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }
    }
    else {
      cards=[];
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
