import {AuthContext} from '../navigation/AuthProvider';
import React, {useState, useContext} from 'react';
import {Formik} from 'formik';
const staticImage = require('.assets/loginlogo.png');

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';





const isValidObjField = obj => {
  return Object.values(obj).every(value => value.trim());
};
const updateError = (error, stateUpdater) => {
  stateUpdater(error);
  setTimeout(() => {
    stateUpdater('');
  }, 2500);
};

const isValidEmail = value => {
  let rjx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  return rjx.test(value);
};


export default function LoginScreen({navigation}) {
  const {login} = useContext(AuthContext); //authcontext by firebase
  
  const [userInfo, setUserinfo] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const {email, password} = userInfo;
  const handleOnchangeText = (value, fieldname) => {
    userInfo['email'];
    userInfo['password'];
    setUserinfo({...userInfo, [fieldname]: value});
  }; 
  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError('Required all fields', setError);
    if (!isValidEmail(email)) return updateError('Inavalid Email', setError);
    if (!password.trim())
      return updateError('password  is required', setError);
    return true;
  };
  const submitForm = () => {
    if (isValidForm()) {
      return true;
    }
  };



  return (
    <View style={styles.container}>
      <Image
        source={require('/home/mambhore/React Native/demofirebase/assets/images.jpeg')}
        style={styles.loginImage}
      />

      <Text style={styles.title}>NEWS INDIA</Text>
      {error ? <Text style={{color:'red',fontSize:18,textAlign:'center'}}>{error}</Text>:null}

      {/* Form Input */}
     
          <>
            <TextInput
              name="email"
              autoCapitalize='none'
              placeholder="Email Address"
              style={styles.textInput}
              onChangeText={value => handleOnchangeText(value, 'email')}
              value={email}
              keyboardType="email-address"
            />
          
            <TextInput
              name="password"
              autoCapitalize='none'
              placeholder="Password"
              style={styles.textInput}
              onChangeText={value => handleOnchangeText(value, 'password')}
              value={password}
              secureTextEntry
            />
            
            {/* login function called from authprovider */}

            <Pressable
              style={styles.btn}
              onPress={() => {
                if (submitForm()) {
                  login(email, password), navigation.navigate('Home');
                }
              }}>
            <Text style={styles.text}>Login</Text>
            </Pressable>
          </>
     

      {/* navigation.navigate() accepts the value of the screen to navigate to sign up page, */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.navButtonText}>
          Dont't have an account? Sign up.
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loginImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },

  title: {
    fontSize: 35,
    alignItems: 'center',
    fontWeight: '900',
    color: 'black',
  },
  btntext: {
    fontSize: 15,
    fontWeight: '800',
  },
  btn: {
    borderRadius: 15,
    borderWidth: 2,
    padding: 1,
    width: '60%',
    color: '#f9f9f9',
    backgroundColor: '#457b9d',
    borderColor: 'gray',
  },
  container: {
    backgroundColor: '#a8dadc',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
    marginTop: 10,
    color: 'white',
    fontWeight: '800',
    textAlign: 'center',
  },
  textInput: {
    height: 50,
    width: '60%',
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 15,
    borderWidth: 3,
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 20,
    color: 'black',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 15,
  },
});
