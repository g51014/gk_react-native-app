/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  CameraRoll,
  Image
} from 'react-native';
import PhotoUpload from 'react-native-photo-upload'

export default class MyComponent extends Component {

  Test(){
    CameraRoll.getPhotos({first:1}).then(data => {
      this.setState({photoSource:{uri:data.edges[3].node.image.uri}});
    },
    error =>{
      console.warn(error);
    });
  }

  render() {
    return (
      <PhotoUpload
        onPhotoSelect={avatar => {
          if (avatar) {
            console.log('Image base64 string: ', avatar)
          }
        }}>
        <Image
          style={{
            paddingVertical: 30,
            width: 150,
            height: 150,
            borderRadius: 75
          }}
          resizeMode='cover'
          source={{
            uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
          }}
        />
      </PhotoUpload>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
