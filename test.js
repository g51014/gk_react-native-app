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
import ImagePicker from 'react-native-image-picker';
import ImageMultiplePicker from 'react-native-image-crop-picker';



export default class MyComponent extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      photoSource: {uri:null,name:null},
      avatarSource: null

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

  Confirm(uri,name)
  {
    console.warn(uri);
    const formData = new FormData();
    formData.append('file', {uri: uri, name: name, type: 'image/jpeg'});
    console.warn(formData);
  }


  render() {
    console.warn(this.state.avatarSource);
    return (
      <View style={styles.container}>
        <Text style={styles.item} onPress={this.choosePic.bind(this)}>选择照片</Text>
        <Text style={styles.item} onPress={this.Confirm.bind(this,this.state.photoSource.uri,this.state.photoSource.name)}>提交照片</Text>
        <Image source={this.state.avatarSource} style={styles.image} />
       </View>
     );
   }
   choosePic() {
     var options = {
       title: '请选择图片来源',
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
       console.warn('Response = ', response);

       if (response.didCancel) {
         console.log('用户取消了选择！');
       }
       else if (response.error) {
         alert("ImagePicker发生错误：" + response.error);
       }
       else if (response.customButton) {
         this.ChooseMultiplePic();
       }
       else {
         let source = { uri: response.uri};
         // You can also display the image using data:
         // let source = { uri: 'data:image/jpeg;base64,' + response.data };
         console.warn(response.data);
         this.setState({
           avatarSource: source,
           photoSource:{uri:response.data,name:response.fileName}
         });
       }
     });
    }

    ChooseMultiplePic()
    {
    ImageMultiplePicker.openPicker({
       multiple: true,
       includeBase64: true
     }).then(images => {
       console.warn(images[0].data);
     });
    }

  }

 //样式定义
 const styles = StyleSheet.create({
   container:{
     flex: 1,
     marginTop:25
   },
   item:{
     margin:15,
     height:30,
     borderWidth:1,
     padding:6,
     borderColor:'#ddd',
     textAlign:'center'
   },
   image:{
    height:198,
    width:300,
    alignSelf:'center',
  },
 });
