import { View, Text,Button,Image } from 'react-native'
import React from 'react'
import  ImagePicker from 'react-native-image-picker';
const Imagepicker = () => {
    const [image, setImage] = React.useState(null);

    let result =  ImagePicker.launchImageLibrary({
        mediaTypes: ImagePicker.mediaTypes,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  )
}


export default Imagepicker