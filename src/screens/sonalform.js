import { Text, View, Button, TextInput ,Alert} from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from './StylesFile'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function HomePage(props) {


  const [formData, setFormData] = useState({
    fname: '',
    email: '',
    password: '',
  });

  const [isValidPass, setValidPass] = useState(false);
  const [isValidName, setValidName] = useState(false);
  const [isValidEmail, setValidEmail] = useState(false);
  const userName = 'name';
  const email1 = 'email';
  const password1 = 'password';

  const nameValidator = (value, type, fieldName) => {
    let data = { ...formData };
    if (type == 'name') {
      data[fieldName] = value;
      setFormData(data);
      let rjx = /(^[a-zA-Z\s]+$)/;
      let isCorrect = rjx.test(formData.fname);

      (!isCorrect == true) ?
        setValidName(true)
        : setValidName(false)
    }
    if (type == 'email') {
      data[fieldName] = value;
      setFormData(data);
      let rjx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      let isCorrect = rjx.test(formData.email);

      (!isCorrect == true) ?
        setValidEmail(true)
        : setValidEmail(false)
    }
    if (type == 'password') {
      data[fieldName] = value;
      setFormData(data);
      (formData.password.length < 8) ?
        setValidPass(false)
        : setValidPass(true)
    }

  }

  const HandleChangeText = async(value, fieldName) => {
    //rest Operator
    if(isValidEmail==false)
    {
      
     await AsyncStorage.setItem("fname",formData.fname);
     await AsyncStorage.setItem("email",formData.email);

  
   
      props.navigation.navigate("Login", { data: [formData] });
    }
    else{
     Alert.alert("Enter Valid Email");
    }
    
    
    

  }

  return (
    <View style={styles.sectionContainer}>
      <View style={{ margin: 20 }}>
        <Text style={styles.heading}>Register</Text>
        <TextInput required style={styles.inputTextStyle} placeholder={userName} value={formData.fname}
          onChangeText={value => nameValidator(value, userName, 'fname')
          } />
        {isValidName == true ? (<Text style={styles.errorStyle}>Enter correct Username</Text>) : null}
        {/* <Text style={{color:"red", marginLeft:20}}>{error}</Text> */}
        <TextInput style={styles.inputTextStyle} placeholder={email1} value={formData.email} onChangeText={value => nameValidator(value, email1, 'email')} />
        {isValidEmail == true ? (<Text style={styles.errorStyle}>Enter correct Email</Text>) : null}
        <TextInput style={styles.inputTextStyle} placeholder={password1} value={formData.password} onChangeText={value => nameValidator(value, password1, 'password')}>
        </TextInput>
        {isValidPass == true ? (<Text style={styles.errorStyle}>password must be 8 character</Text>) : null}
        <View style={styles.buttonContainer}>
          <Button title='submit' on onPress={() =>
           HandleChangeText()
          } />
        </View>
        <Text>{isValidEmail}</Text>
      </View>
    </View>
  )
}

