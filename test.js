/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  CameraRoll,
  Image,
  Button,
  TouchableHighlight,
} from 'react-native';

export default class MyComponent extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      photoSource: null
    };
  }

  getPhotosFromGallery() {
      CameraRoll.getPhotos({ first: 1000000 })
        .then(data => {
          this.setState({photoSource:{uri:data.edges[3].node.image.uri}});
        },error =>
        {
          console.warn(error);
        });
    }

    saveImg() {
      var img = "https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=8d3a9ea62c7f9e2f6f351b082f31e962/500fd9f9d72a6059099ccd5a2334349b023bbae5.jpg";
      let promise = CameraRoll.saveToCameraRoll(img);
      promise.then(function (result) {
          alert('保存成功！地址如下：\n' + result);
      }).catch(function (error) {
          alert('保存失败！\n' + error);
      });
    }

  render() {
    console.warn(this.state.photoSource);
    return (
       <View style={styles.container}>
         <TouchableHighlight >
           <Button onPress={this.getPhotosFromGallery.bind(this)} title="hihi"/>
         </TouchableHighlight>
         <Image  resizeMode='cover' source={{uri:'https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=8d3a9ea62c7f9e2f6f351b082f31e962/500fd9f9d72a6059099ccd5a2334349b023bbae5.jpg'}}/>
       </View>
     );
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
