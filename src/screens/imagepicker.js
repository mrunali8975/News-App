import {View, Text, TouchableOpacity, StyleSheet, Linking} from 'react-native';
import React, {useState, useEffect} from 'react';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import RNFS from 'react-native-fs';
import Camera from 'react-native-camera';
import {PermissionsAndroid} from 'react-native';
import {Permission} from 'react-native-permissions';
import {openSettings} from 'react-native-permissions';
import Homescreen from './HomeScreen';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {Link, NavigationHelpersContext} from '@react-navigation/native';
import NativeLinkingManager from 'react-native/Libraries/Linking/NativeLinkingManager';

const Imagepicker = ({navigation}) => {
  const [{cameraRef}, {takePicture}] = useCamera(null);
  const [date, setDate] = useState('');

  useEffect(() => {
    let today = new Date();
    let date =
      today.getFullYear() + '' + today.getHours() + '' + today.getSeconds();
    setDate(date);
  }, []);


  const captureHandle = async () => {
    try {
      const data = await takePicture();
      console.log(data.uri);
      const filePath = data.uri;
      const newFilePath = RNFS.ExternalDirectoryPath + `${date}.jpg`;

      RNFS.moveFile(filePath, newFilePath)
        .then(() => {
          console.log('IMAGE MOVED', filePath, ' --- >', newFilePath);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <RNCamera
        ref={cameraRef}
        type={RNCamera.Constants.Type.back}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        notAuthorizedView={
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Pressable
              style={{
                backgroundColor: 'lightgreen',
                width: '40%',
                height:30,
                alignItems: 'center',
                justifyContent: 'center',
                
              }}
              onPress={() => navigation.navigate('Home')}>
              <Text style={{fontSize:18,fontWeight:'500'}}>Open Setting</Text>
            </Pressable>
          </View>
        }
        style={styles.preview}>
        <TouchableOpacity
          style={{
            backgroundColor: '#1eb900',
            height: 40,
            width: 100,
            marginBottom: 10,
            padding: 7,
          }}
          onPress={() => captureHandle()}>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              fontWeight: '500',
              textAlign: 'center',
            }}>
            Capture
          </Text>
        </TouchableOpacity>
      </RNCamera>
    </View>
  );
};
const styles = StyleSheet.create({
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',

    height: 50,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
  },
});

export default Imagepicker;
